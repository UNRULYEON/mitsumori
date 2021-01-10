import { Route, Switch, useHistory } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import "./scss/main.scss"

import Main from "./pages/main"
import Room from "./pages/room"
import { useSnackbar } from "notistack"
import { useEffect } from "react"
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil"
import { Socket_RoomCreated, Socket_RoomDeckChange, Socket_RoomJoined, Socket_RoomMemberLeft, Socket_RoomMemberUpdated, Socket_RoomMemberVoted, Socket_RoomResetti } from "../../types"
import { DecksState, DeckState, SocketState, UsersState, UserState } from "./state"

type Routes = {
  path: string | string[]
  exact?: boolean
  Component: () => JSX.Element
}

const routes: Routes[] = [
  { path: ["/room/:room_id"], exact: true, Component: () => <Room /> },
  { path: ["/"], Component: () => <Main /> },
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

  const [ user, setUser ] = useRecoilState(UserState)
  const setUsers = useSetRecoilState(UsersState)
  const setDecks = useSetRecoilState(DecksState)
  const setDeck = useSetRecoilState(DeckState)

  useEffect(() => {
    socket.on("room-created", (payload: Socket_RoomCreated) => {
      enqueueSnackbar("Room has been created.")
      history.push(`/room/${payload.room_code}`)
    })

    socket.on("room-joined", (payload: Socket_RoomJoined) => {
      enqueueSnackbar(`You've joined the room.`)
      setUser({ ...user, room_code: payload.room_code })
      history.push(`/room/${payload.room_code}`)
    })

    socket.on("member-joined", (payload: Socket_RoomJoined) => {
      enqueueSnackbar(`${payload.new_member.name} has joined the room.`)
      setUsers(payload.members)
      setDeck(payload.deck)
      setDecks(payload.decks)
    })

    socket.on("member-left", (payload: Socket_RoomMemberLeft) => {
      enqueueSnackbar(`${payload.member_that_left.name} has left the room.`)
      setUsers(payload.members.sort((a, b) => a.is_observer === b.is_observer ? 0 : a.is_observer ? 1 : -1))
    })

    socket.on('member-updated', (payload: Socket_RoomMemberUpdated) => {
      setUsers(payload.members.sort((a, b) => a.is_observer === b.is_observer ? 0 : a.is_observer ? 1 : -1))
    })

    socket.on('member-voted', (payload: Socket_RoomMemberVoted) => {
      setUsers(payload.members.sort((a, b) => a.is_observer === b.is_observer ? 0 : a.is_observer ? 1 : -1))
    })

    socket.on('deck-change', (payload: Socket_RoomDeckChange) => {
      setUsers(payload.members.sort((a, b) => a.is_observer === b.is_observer ? 0 : a.is_observer ? 1 : -1))
      setDeck(payload.deck)
      setUser({ ...user, room_code: payload.room_code, vote: '' })
    })

    socket.on('round-resetted', (payload: Socket_RoomResetti) => {
      enqueueSnackbar(`Round has been reset.`)
      setUsers(payload.members.sort((a, b) => a.is_observer === b.is_observer ? 0 : a.is_observer ? 1 : -1))
      setUser({ ...user, name: localStorage.getItem('name') || '', vote: '' })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Route
        render={({ location }) => (
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
                    transition={{ ease: "easeInOut", duration: 0.2 }}
                  >
                    <Component />
                  </motion.div>
                </Route>
              ))}
            </Switch>
          </AnimatePresence>
        )}
      />
    </>
  )
}

export default App
