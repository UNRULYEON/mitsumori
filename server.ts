import express from 'express'
import { Server as HTTPServer } from 'http'
import { Server as IOServer, Socket } from 'socket.io'
import Datastore from 'nedb'
import { User, DB_User, Socket_RoomCreated, Socket_RoomJoined, Socket_RoomMemberLeft } from './types'

const app = express()
const server = new HTTPServer(app)
const io = new IOServer(server)
const db = new Datastore()
const port = process.env.PORT || 8000

app.get('/health', (_, res) => res.sendStatus(200))

io.on('connection', (socket: Socket) => {
  // Create a room
  socket.on('create-room', (new_user: User) => {
    if (process.env.NODE_ENV === 'development')
      console.log(new_user)

    let user: DB_User = {
      ...new_user,
      id: socket.id,
      room_code: Math.floor(Math.random() * (999999999 - 100000000) + 100000000).toString()
    }

    db.insert(user)

    socket.join(user.room_code)

    socket.emit('room-created', user.room_code)
    
    db.find({ room_code: user.room_code }, (err, docs: User[]) => {
      const payload: Socket_RoomCreated = { new_member: user, members: docs }

      io.in(user.room_code).emit('member-joined', payload)
    })
  })

  // Join a room
  socket.on('join-room', (new_user: User) => {
    if (process.env.NODE_ENV === 'development')
      console.log(new_user)

      let user: DB_User = {
        ...new_user,
        id: socket.id
      }
  
      db.insert(user)
  
      socket.join(user.room_code)
  
      socket.emit('room-joined', user.room_code)
      
      db.find({ room_code: user.room_code }, (err, docs: User[]) => {
        const payload: Socket_RoomJoined = { new_member: user, members: docs }

        io.in(user.room_code).emit('member-joined', payload)
      })
  })

  // Change name

  // Change deck

  // Submit card

  // Reset round

  // Disconnect
  socket.on('disconnecting', () => {
    const socket_id: string = socket.id
    const rooms: string[] = []

    socket.rooms.forEach((v) => {
      rooms.push(v)
    })

    let current_room: string = rooms[1]

    if (process.env.NODE_ENV === 'development')
      console.log(`${socket_id} left`)

    db.find({ id: socket_id }, (err, doc: User[]) => {
      db.remove({ id: socket_id }, (err, numRemoved) => {
        db.find({ room_code: current_room }, (err, docs: User[]) => {
          const payload: Socket_RoomMemberLeft = { member_that_left: doc[0], members: docs }
  
          io.in(current_room).emit('member-left', payload)
        })
      })
    })
  })

  // Error
})

server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})