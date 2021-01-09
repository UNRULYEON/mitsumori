import express from "express";
import { Server as HTTPServer } from "http";
import { Server as IOServer, Socket } from "socket.io";
import loki from "lokijs";
import path from "path";
import {
  User,
  DB_User,
  DB_Room,
  Socket_RoomJoined,
  Socket_RoomMemberLeft,
  Socket_RoomMemberVoted,
  Socket_RoomMemberUpdated,
  Socket_RoomResetti,
  ResetRoom,
  ChangeDeck,
  Socket_RoomDeckChange,
} from "./types";
import config from "./config";

const app = express();
const server = new HTTPServer(app);
const io = new IOServer(server);
const db = new loki(config.name);
const rooms = db.addCollection<DB_Room>("room");
const port = process.env.PORT || 8000;

const getDefaultDeck = () => {
  if (config.decks.length > 0) {
    let deckIndex = config.decks.findIndex((d) => d.name === config.default_deck);
    if (deckIndex !== -1) {
      return config.decks[deckIndex];
    } else {
      console.log(`Default deck ${config.default_deck} doesn't exist.`);
      return config.decks[0];
    }
  } else {
    throw Error("No decks in config!")
  }
};

app.use(express.static(path.join(__dirname, "./client")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/index.html"));
});

app.get("/health", (_, res) => res.sendStatus(200));

io.on("connection", (socket: Socket) => {
  // Create a room
  socket.on("create-room", (new_user: User) => {
    console.log("[CREATING ROOM]");
    console.log(new_user);
    console.log();

    let user: DB_User = {
      ...new_user,
      id: socket.id,
      room_code: Math.floor(Math.random() * (999999999 - 100000000) + 100000000).toString(),
    };

    let room: DB_Room = {
      room_code: user.room_code,
      deck: getDefaultDeck(),
      decks: [...config.decks],
      members: [],
    };

    rooms.insert(room);

    socket.join(user.room_code);

    socket.emit("room-created", user.room_code);
  });

  // Join a room
  socket.on("join-room", (new_user: User) => {
    console.log("[JOINING ROOM]");
    console.log(new_user);
    console.log();

    let user: DB_User = {
      ...new_user,
      id: socket.id,
    };

    let existing_room = rooms.find({ room_code: user.room_code });

    if (existing_room.length > 0) {
      existing_room[0].members.push(user);

      rooms.update(existing_room);
    } else {
      let room: DB_Room = {
        room_code: user.room_code,
        deck: getDefaultDeck(),
        decks: [...config.decks],
        members: [user],
      };

      rooms.insert(room);
    }

    socket.join(user.room_code);

    socket.emit("room-joined", user.room_code);
  });

  // Join a room without confirmation
  socket.on("join-room-no-confirmation", (new_user: User) => {
    console.log("[JOINING ROOM - NO CONFIRMATION]");
    console.log(new_user);
    console.log();

    let user: DB_User = {
      ...new_user,
      id: socket.id,
    };

    let existing_room = rooms.find({ room_code: user.room_code });

    if (existing_room.length > 0) {
      let memberIndex = existing_room[0].members.findIndex((m) => m.id === socket.id);

      if (memberIndex !== -1) {
        existing_room[0].members[memberIndex] = {
          ...existing_room[0].members[memberIndex],
          ...user,
        };
      } else {
        existing_room[0].members.push(user);
      }

      rooms.update(existing_room);
    } else {
      let room: DB_Room = {
        room_code: user.room_code,
        deck: getDefaultDeck(),
        decks: [...config.decks],
        members: [user],
      };

      rooms.insert(room);
    }

    socket.join(user.room_code);

    let room = rooms.find({ room_code: user.room_code });

    const payload: Socket_RoomJoined = {
      new_member: user,
      members: room[0].members,
      decks: [...config.decks],
      deck: room[0].deck,
    };

    io.in(user.room_code).emit("member-joined", payload);
  });

  // Update member
  socket.on("update-member", (updated_user: User) => {
    console.log("UPDATING MEMBER");
    console.log(updated_user);
    console.log();

    let room = rooms.find({ room_code: updated_user.room_code });

    let memberIndex = room[0].members.findIndex((m) => m.id === socket.id);

    if (memberIndex !== -1) {
      room[0].members[memberIndex] = {
        ...room[0].members[memberIndex],
        ...updated_user,
        vote: updated_user.is_observer ? "" : room[0].members[memberIndex].vote,
      };
    }

    rooms.update(room);

    const payload: Socket_RoomMemberUpdated = {
      members: room[0].members,
    };

    io.in(updated_user.room_code).emit("member-updated", payload);
  });

  // Cast vote
  socket.on("cast-vote", (voted_user: User) => {
    console.log("[CASTING VOTE]");
    console.log(voted_user);
    console.log();

    let room = rooms.find({ room_code: voted_user.room_code });

    let memberIndex = room[0].members.findIndex((m) => m.id === socket.id);

    room[0].members[memberIndex].vote = voted_user.vote;

    rooms.update(room);

    const payload: Socket_RoomMemberVoted = {
      members: room[0].members,
    };

    io.in(voted_user.room_code).emit("member-voted", payload);
  });

  // Change deck
  socket.on("change-deck", (data: ChangeDeck) => {
    console.log("[CHANGING DECK]");
    console.log();

    let room = rooms.find({ room_code: data.room_code });

    let deckIndex = room[0].decks.findIndex((d) => d.name === data.deck_name);

    room[0].members = room[0].members.map((m) => ({ ...m, vote: "" }));
    room[0].deck = config.decks[deckIndex];

    rooms.update(room);

    const payload: Socket_RoomDeckChange = {
      room_code: data.room_code,
      members: room[0].members,
      deck: config.decks[deckIndex],
    };

    io.in(data.room_code).emit("deck-change", payload);
  });

  // Reset round
  socket.on("reset-round", (data: ResetRoom) => {
    console.log("[RESETTING ROUND]");
    console.log();

    let room = rooms.find({ room_code: data.room_code });

    room[0].members = room[0].members.map((m) => ({ ...m, vote: "" }));

    rooms.update(room);

    const payload: Socket_RoomResetti = {
      room_code: data.room_code,
      members: room[0].members,
    };

    io.in(data.room_code).emit("round-resetted", payload);
  });

  // Disconnect
  socket.on("disconnecting", () => {
    const socket_id: string = socket.id;
    const user_rooms: string[] = [];

    socket.rooms.forEach((v) => {
      user_rooms.push(v);
    });

    let current_room: string = user_rooms[1];

    if (process.env.NODE_ENV === "development") console.log(`${socket_id} left`);

    let room = rooms.find({ room_code: current_room });

    if (room.length > 0) {
      let memberIndex: number = room[0].members.findIndex((m) => m.id === socket_id);
      let member_that_left: DB_User = room[0].members[memberIndex];

      room[0].members.splice(memberIndex, 1);

      rooms.update(room);

      const payload: Socket_RoomMemberLeft = {
        member_that_left: member_that_left,
        members: room[0].members,
      };

      io.in(current_room).emit("member-left", payload);
    }
  });

  // Error
});

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
