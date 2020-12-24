import { useEffect, useState } from "react"
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core"
import Dialog from "../components/Dialog"
import GithubLogo from "../img/github.png"
import { SocketState, UserState } from "../state"
import { useRecoilState, useRecoilValue } from "recoil"

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
          <svg width="58.642" height="50" viewBox="0 0 58.642 50">
            <defs>
              <clipPath id="clipPath">
                <ellipse
                  id="Ellipse_11"
                  data-name="Ellipse 11"
                  cx="6.558"
                  cy="3.445"
                  rx="6.558"
                  ry="3.445"
                />
              </clipPath>
            </defs>
            <g
              id="Group_29"
              data-name="Group 29"
              transform="translate(-868.179 -82.716)"
            >
              <g
                id="Group_28"
                data-name="Group 28"
                transform="matrix(0.966, -0.259, 0.259, 0.966, 868.179, 90.268)"
              >
                <g
                  id="Rectangle_4"
                  data-name="Rectangle 4"
                  transform="translate(0 0)"
                  fill="#fff"
                  stroke="#000"
                  strokeWidth="2"
                >
                  <rect width="29.182" height="43.773" rx="5" stroke="none" />
                  <rect
                    x="1"
                    y="1"
                    width="27.182"
                    height="41.773"
                    rx="4"
                    fill="none"
                  />
                </g>
                <g
                  id="Group_25"
                  data-name="Group 25"
                  transform="translate(4.947 12.034)"
                >
                  <g
                    id="Group_24"
                    data-name="Group 24"
                    transform="translate(0 0)"
                  >
                    <path
                      id="Path_30"
                      data-name="Path 30"
                      d="M7.778,0C3.889,0,0,1.473,0,4.415,0,7.693,1.538,13.5,7.778,13.5s7.778-5.8,7.778-9.083C15.556,1.473,11.667,0,7.778,0Z"
                      transform="translate(0 6.536)"
                      fill="#e0e0e0"
                    />
                    <g
                      id="Group_21"
                      data-name="Group 21"
                      transform="translate(3.348 0)"
                    >
                      <path
                        id="XMLID_16_"
                        d="M1.382,7.012A2.33,2.33,0,0,1,.01,5.262c-.111-1.438.7-1.953.7-3.207C.709,1,.531.452.182.165.081.082.064.054.074.031s.015-.047.17-.01a2.156,2.156,0,0,1,1.7,2c.033,1.332-.7,1.641-.807,3.087A2.849,2.849,0,0,0,1.447,6.9c.044.06.051.085.049.1S1.454,7.039,1.382,7.012Z"
                        transform="translate(0 0.666)"
                        fill="#e0e0e0"
                      />
                      <path
                        id="XMLID_15_"
                        d="M1.382,7.011A2.33,2.33,0,0,1,.01,5.261c-.111-1.438.7-1.953.7-3.207C.709,1,.531.451.182.163.081.082.064.054.074.031s.015-.047.17-.01a2.156,2.156,0,0,1,1.7,2c.033,1.332-.7,1.641-.807,3.087A2.849,2.849,0,0,0,1.447,6.9c.044.06.051.085.049.1S1.454,7.039,1.382,7.011Z"
                        transform="translate(3.584 0)"
                        fill="#e0e0e0"
                      />
                      <path
                        id="XMLID_14_"
                        d="M1.382,7.012A2.331,2.331,0,0,1,.01,5.262c-.111-1.438.7-1.953.7-3.207C.709,1,.531.452.182.165.081.082.064.054.074.031s.015-.047.17-.01a2.156,2.156,0,0,1,1.7,2c.033,1.332-.7,1.641-.807,3.087A2.849,2.849,0,0,0,1.447,6.9c.044.06.051.085.049.1S1.454,7.04,1.382,7.012Z"
                        transform="translate(6.916 0.802)"
                        fill="#e0e0e0"
                      />
                    </g>
                    <g
                      id="Group_23"
                      data-name="Group 23"
                      transform="translate(1.22 7.545)"
                    >
                      <ellipse
                        id="Ellipse_9"
                        data-name="Ellipse 9"
                        cx="6.558"
                        cy="3.445"
                        rx="6.558"
                        ry="3.445"
                        transform="translate(0 0)"
                        fill="#90a4ae"
                      />
                      <g
                        id="Group_22"
                        data-name="Group 22"
                        transform="translate(0 0)"
                        clipPath="url(#clipPath)"
                      >
                        <ellipse
                          id="Ellipse_10"
                          data-name="Ellipse 10"
                          cx="6.558"
                          cy="3.445"
                          rx="6.558"
                          ry="3.445"
                          transform="translate(0 1.701)"
                          fill="#855c52"
                        />
                      </g>
                    </g>
                    <path
                      id="Path_31"
                      data-name="Path 31"
                      d="M1.014,7.724c-.108,0-.17,0-.175,0A.9.9,0,0,1,.955,5.928c.042,0,4.3.041,4.968-2.263a1.4,1.4,0,0,0-.047-1.218c-.168-.23-.669-.619-2.131-.651A.9.9,0,0,1,3.785,0,4.267,4.267,0,0,1,7.326,1.385a3.056,3.056,0,0,1,.322,2.782C6.66,7.541,1.982,7.724,1.014,7.724Z"
                      transform="translate(11.469 9.778)"
                      fill="#e0e0e0"
                    />
                  </g>
                  <path
                    id="Path_32"
                    data-name="Path 32"
                    d="M3.275.56c.2-.024.4-.217.331-.382C3.55.041,3.35.008,3.182,0A7.059,7.059,0,0,0,.4.774C.271.836.041,1,.007,1.135A.233.233,0,0,0,.24,1.4a.984.984,0,0,0,.439-.1A8.581,8.581,0,0,1,3.275.56Z"
                    transform="translate(3.322 10.537)"
                    fill="#bcaaa4"
                  />
                </g>
              </g>
              <g
                id="Group_9"
                data-name="Group 9"
                transform="matrix(0.966, 0.259, -0.259, 0.966, 898.541, 82.719)"
              >
                <g
                  id="Rectangle_4-2"
                  data-name="Rectangle 4"
                  transform="translate(0 0)"
                  fill="#fff"
                  stroke="#000"
                  strokeWidth="2"
                >
                  <rect width="29.277" height="43.916" rx="5" stroke="none" />
                  <rect
                    x="1"
                    y="1"
                    width="27.277"
                    height="41.916"
                    rx="4"
                    fill="none"
                  />
                </g>
                <text
                  id="_"
                  data-name="?"
                  transform="translate(9.542 29.425)"
                  fontSize="19"
                  fontFamily="Quicksand-Bold, Quicksand"
                  fontWeight="700"
                >
                  <tspan x="0" y="0">
                    ?
                  </tspan>
                </text>
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
        <div className="footer-divider" />
        <Button variant="text">About</Button>
        <div className="footer-divider" />
        <Button variant="text">Language</Button>
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
    </>
  )
}

export default Main
