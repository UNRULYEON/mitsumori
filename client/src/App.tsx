import {
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import "./scss/main.scss"

import Main from './pages/main'
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { Socket_RoomJoined, Socket_RoomMemberLeft } from "../../types";
import { SocketState, UsersState } from "./state";

type Routes = {
  path: string | string[]
  exact?: boolean
  Component: () => JSX.Element
}

const routes: Routes[] = [
  { path: ['/room/:room_id'], exact: true, Component: () =>  <>In room</> },
  { path: ['/'], Component: () => <Main /> },
]

function App() {
  const socket = useRecoilValue(SocketState)
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()

  const MotionVariantsRoute = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  }
  
  const [ users, setUsers ] = useRecoilState(UsersState)

  useEffect(() => {
    socket.on('room-created', (room_code: string) => {
      enqueueSnackbar('Room has been created.')
      history.push(`/room/${room_code}`)
    })

    socket.on('room-joined', (room_code: string) => {
      enqueueSnackbar(`You've joined the room.`)
      history.push(`/room/${room_code}`)
    })

    socket.on('member-joined', (payload: Socket_RoomJoined) => {
      enqueueSnackbar(`${payload.new_member.name} has joined the room.`)
      setUsers(payload.members)
      console.log(payload)
    })

    socket.on('member-left', (payload: Socket_RoomMemberLeft) => {
      console.log(payload)
      enqueueSnackbar(`${payload.member_that_left.name} has left the room.`)
      setUsers(payload.members)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (<>
    <Route render={({ location }) => (
      <AnimatePresence exitBeforeEnter initial={true}>
        <Switch location={location} key={`${location.pathname}`}>
          {routes.map(({ path, exact, Component }, key) => (
            <Route key={key} exact={exact} path={path}>
              <motion.div
                className="motion-div"
                initial="initial"
                animate="in"
                exit="out"
                variants={MotionVariantsRoute}
                transition={{ ease: "easeInOut", duration: .2 }}
              >
                <Component />
              </motion.div>
            </Route>
          ))}
        </Switch>
      </AnimatePresence>
    )} />
  </>)
}

export default App