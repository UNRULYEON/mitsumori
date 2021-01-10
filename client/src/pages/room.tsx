import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import GithubLogo from "../img/github.png"
import { DecksState, DeckState, SocketState, UsersState, UserState } from "../state"
import Dialog from "../components/Dialog"
import NotVotedIcon from '../img/NotVotedIcon'
import VotedIcon from '../img/VotedIcon'
import { getFormattedRoomCode } from '../utilities'
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';

const Room = () => {
  const socket = useRecoilValue(SocketState)
  const [user, setUser] = useRecoilState(UserState)
  const members = useRecoilValue(UsersState)
  const deck = useRecoilValue(DeckState)
  const decks = useRecoilValue(DecksState)
  let { room_id }: { room_id: string } = useParams()

  const [joinRoomDialog, setJoinRoomDialog] = useState<boolean>(false)
  const [roomSettingsDialog, setRoomSettingsDialog] = useState<boolean>(false)

  useEffect(() => {
    setUser({ ...user, room_code: room_id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user.name === "") {
      setJoinRoomDialog(true)
    } else {
      joinRoom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    setJoinRoomDialog(false)
    setRoomSettingsDialog(false)
  }

  const handleDeckChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    socket.emit('change-deck', { room_code: user.room_code, deck_name: event.target.value })
  }

  const joinRoom = () => {
    socket.emit("join-room-no-confirmation", { ...user, room_code: room_id })
    setJoinRoomDialog(false)
  }

  const changeToObserver = () => {
    setUser({ ...user, vote: '', is_observer: true })
    socket.emit('update-member', { ...user, is_observer: true, room_code: room_id })
  }

  const changeToPlayer = () => {
    setUser({ ...user, vote: '', is_observer: false })
    socket.emit('update-member', { ...user, is_observer: false, room_code: room_id })
  }

  const castVote = (value: string) => {
    socket.emit('cast-vote', { ...user, room_code: room_id, vote: user.vote === value ? '' : value })
    setUser({ ...user, vote: user.vote === value ? '' : value })
  }

  const resetti = () => {
    socket.emit('reset-round', { room_code: room_id })
  }

  return (
    <div id="room">
      <div id="header">
        <div className="container">
          <span id="room-code-container">Room code: {getFormattedRoomCode(room_id)}</span>
          <div id="name-container">
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="Name"
              value={user.name}
              onChange={(e) => {
                localStorage.setItem("name", e.target.value)
                setUser({ ...user, name: e.target.value })
                socket.emit('update-member', { ...user, name: e.target.value, room_code: room_id })
              }}
            />
          </div>
          <div id="room-settings-container">
            <Button disableElevation variant="contained" onClick={() => setRoomSettingsDialog(true)}>
              Room settings
            </Button>
          </div>
        </div>
      </div>
      <div id="deck">
        <div className="container">
          <span id="deck-name-container">Deck: {deck.name}</span>
          <div id="change-kind-container">
            <Button
              disableElevation
              variant="contained"
              onClick={() => user.is_observer ? changeToPlayer() : changeToObserver()}
            >
              {user.is_observer ? "Change to player" : "change to observer"}
            </Button>
          </div>
        </div>
        <div className="deck-container-wrapper">
          <div className="deck-container">
            {deck.name !== "" ? (
              <>
                {user.is_observer ? (
                  <h1 id="observer-text-container">You're an observer</h1>
                ) : (
                  <>
                    {deck.cards.map((card, key) => (
                      <div
                        className={`card-container ${
                          card.value === user.vote ? "voted" : "not-voted"
                        }`}
                        onClick={() => castVote(card.value)}
                        key={key}
                      >
                        {card.value}
                      </div>
                    ))}
                  </>
                )}
              </>
            ) : (
              <div className="deck-loading">
                <CircularProgress />
              </div>
            )}
          </div>
        </div>
      </div>
      <div id="members">
        <div className="container">
          {members.length > 1 &&
            <div id="reset-button">
              <Button
                disableElevation
                onClick={() => resetti()}
              >
                Reset round
              </Button>
            </div>
          }
          {members.length > 1 ? (<div className="members-container">
            {members.map((member, key) => (
              <div className="member-container" key={key}>
                <div className={`member-card ${member.is_observer ? 'observer' : 'player'} ${members.filter(x => !x.is_observer).every(m => m.vote !== '') || member.is_observer ? 'visible' :  member.vote !== '' ? 'voted' : 'not-voted'}`}>
                  {member.is_observer
                    ? <VisibilityRoundedIcon style={{ padding: 0, margin: 0 }}  />
                    : members.filter(x => !x.is_observer).every(m => m.vote !== '')
                      ? member.vote
                      : member.vote !== ''
                        ? <VotedIcon />
                        : <NotVotedIcon />}
                </div>
                <span className="member-name">{member.name}</span>
              </div>
            ))}
          </div>) : (<div className="members-empty-state">
            <h1>Invite other members from your team with this link</h1>
            <span className="link">{window.location.protocol}//{window.location.hostname}{window.location.pathname}</span>
          </div>)}
        </div>
      </div>
      <footer>
        <a href="https://github.com/UNRULYEON/mitsumori">
          <img
            src={GithubLogo}
            id="footer-github-logo"
            alt="repository-of-mitsumori"
          />
        </a>
      </footer>
      <Dialog
        open={roomSettingsDialog}
        onClose={handleClose}
        content={() => (
          <>
            <FormControl variant="outlined">
              <InputLabel id="deck-select-outlined-label">Decks</InputLabel>
              <Select
                labelId="deck-select-outlined-label"
                id="deck-select-outlined"
                value={deck.name}
                onChange={handleDeckChange}
                label="Decks"
              >
                {decks.map((d, key) => (
                  <MenuItem key={`${key}-${d.name}`} value={d.name}>{d.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
        actions={({ onClose }) => 
          <>
            <Button
              fullWidth
              variant="text"
              onClick={onClose}
            >
              Close
            </Button>
          </>}
      />
      <Dialog
        open={joinRoomDialog}
        onClose={handleClose}
        content={() => (
          <>
            <TextField
              label="Name"
              variant="outlined"
              value={user.name}
              onChange={(e) => {
                localStorage.setItem("name", e.target.value)
                setUser({ ...user, name: e.target.value })
              }}
            />
            <TextField
              label="Room code"
              variant="outlined"
              value={user.room_code}
              onChange={(e) => setUser({ ...user, room_code: e.target.value })}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={user.is_observer}
                  onChange={(e) => {
                    localStorage.setItem(
                      "is_observer",
                      String(e.target.checked)
                    )
                    setUser({ ...user, is_observer: e.target.checked })
                  }}
                  name="I'm an observer"
                />
              }
              label="I'm an observer"
            />
          </>
        )}
        actions={({ onClose }) => (
          <>
            <Button fullWidth onClick={onClose} variant="text">
              Cancel
            </Button>
            <Button
              fullWidth
              disableElevation
              onClick={joinRoom}
              variant="contained"
            >
              Join
            </Button>
          </>
        )}
      />
    </div>
  )
}

export default Room
