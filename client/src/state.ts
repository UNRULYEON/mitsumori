import { atom } from 'recoil'
import { User } from '../../types';
import socketIOClient from "socket.io-client"

export const SocketState = atom({
  key: 'SocketState',
  default: socketIOClient(`${process.env.NODE_ENV !== 'development' ? window.location.origin : 'http://localhost:8000'}`, {
    secure: true,
    transports: [ 'websocket' ]
  })
})

export const AboutDialogState = atom<boolean>({
  key: 'AboutDialogState',
  default: false,
});

export const UserState = atom<User>({
  key: 'UserState',
  default: {
    name: localStorage.getItem('name') || '',
    room_code: '',
    is_observer: (localStorage.getItem('is_observer') === 'true' ? true : false) || false
  }
})

export const UsersState = atom<User[]>({
  key: 'UsersState',
  default: []
})