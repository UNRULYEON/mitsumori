import React, { useEffect, useState } from "react"
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Tooltip,
} from "@material-ui/core"
import Dialog from "../components/Dialog"
import GithubLogo from "../img/github.png"
import { SocketState, UserState } from "../state"
import { useRecoilState, useRecoilValue } from "recoil"
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';

const Main = () => {
  const [createRoomDialog, setCreateRoomDialog] = useState<boolean>(false)
  const [joinRoomDialog, setJoinRoomDialog] = useState<boolean>(false)
  const [user, setUser] = useRecoilState(UserState)
  const socket = useRecoilValue(SocketState)

  const handleClose = () => {
    setCreateRoomDialog(false)
    setJoinRoomDialog(false)
  }

  const createRoom = () => {
    socket.emit("create-room", user)
  }

  const joinRoom = () => {
    socket.emit("join-room", user)
  }

  return (
    <>
      <header>
        <div id="logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="71.332" height="54.052" viewBox="0 0 71.332 54.052">
            <g id="Group_90" data-name="Group 90" transform="translate(-76.409 -80)">
              <g id="Group_89" data-name="Group 89" transform="matrix(0.966, -0.259, 0.259, 0.966, 76.409, 88.176)">
                <g id="Rectangle_4" data-name="Rectangle 4" transform="translate(0 0)" fill="#fff" stroke="#000" strokeWidth="3">
                  <rect width="31.549" height="47.323" rx="5" stroke="none"/>
                  <rect x="1.5" y="1.5" width="28.549" height="44.323" rx="3.5" fill="none"/>
                </g>
                <text id="モ_レ" data-name="モ
          レ" transform="translate(9.473 19.242)" fontSize="13" fontFamily="PingFangSC-Semibold, PingFang SC" fontWeight="600"><tspan x="0" y="0">モ</tspan><tspan y="0" fontFamily="Quicksand-Bold, Quicksand" fontWeight="700"></tspan><tspan x="0" y="18">レ</tspan></text>
              </g>
              <g id="Group_88" data-name="Group 88" transform="matrix(0.966, 0.259, -0.259, 0.966, 117.167, 80)">
                <g id="Rectangle_4-2" data-name="Rectangle 4" transform="translate(0)" fill="#fff" stroke="#000" strokeWidth="3">
                  <rect width="31.652" height="47.478" rx="5" stroke="none"/>
                  <rect x="1.5" y="1.5" width="28.652" height="44.478" rx="3.5" fill="none"/>
                </g>
                <text id="ミ_ツ" data-name="ミ
          ツ" transform="translate(9.283 19.949)" fontSize="13" fontFamily="PingFangSC-Semibold, PingFang SC" fontWeight="600"><tspan x="0" y="0">ミ</tspan><tspan y="0" fontFamily="Quicksand-Bold, Quicksand" fontWeight="700"></tspan><tspan x="0" y="18">ツ</tspan></text>
              </g>
            </g>
          </svg>
        </div>
        <h1 id="name">mitsumori</h1>
      </header>
      <main>
        <h1 id="cta">Play online scrum poker with your team</h1>
        <div id="actions">
          <Button
            disableElevation
            variant="contained"
            onClick={() => setCreateRoomDialog(true)}
          >
            Create a room
          </Button>
          <Button variant="outlined" onClick={() => setJoinRoomDialog(true)}>
            Join a room
          </Button>
        </div>
      </main>
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
        open={createRoomDialog}
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
              label={<>I'm an observer <Tooltip title="You would likely be an observer if you're Project Manager or like to watch 😉"><HelpOutlineRoundedIcon fontSize="small" /></Tooltip></>}
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
              onClick={createRoom}
              variant="contained"
            >
              Create
            </Button>
          </>
        )}
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
              label={<>I'm an observer <Tooltip title="You would likely be an observer if you're Project Manager or like to watch 😉"><HelpOutlineRoundedIcon fontSize="small" /></Tooltip></>}
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
    </>
  )
}

export default Main
