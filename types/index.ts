export type User = {
  name: string
  room_code: string
  is_observer: boolean
}

export type DB_User = {
  id: string
} & User

export type Socket_RoomCreated = {
  new_member: User
  members: User[]
}

export type Socket_RoomJoined = {
  new_member: User
  members: User[]
}

export type Socket_RoomMemberLeft = {
  member_that_left: User
  members: User[]
}