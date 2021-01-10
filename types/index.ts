export type User = {
  name: string
  room_code: string
  is_observer: boolean
  vote: string
}

export type DB_User = {
  id: string
} & User

export type DB_Room = {
  room_code: string
  deck: Deck,
  decks: Deck[],
  members: DB_User[]
}

export type Socket_RoomCreated = {
  id: string
  room_code: string
}

export type Socket_RoomJoined = {
  room_code: string
  new_member: User
  members: User[]
  deck: Deck
  decks: Deck[]
}

export type Socket_RoomMemberLeft = {
  member_that_left: User
  members: User[]
}

export type Socket_RoomMemberUpdated = {
  members: User[]
}

export type Socket_RoomMemberVoted = {
  members: User[]
}

export type Socket_RoomDeckChange = {
  room_code: string
  members: User[]
  deck: Deck
}

export type ChangeDeck = {
  room_code: string
  deck_name: string
}

export type ResetRoom = {
  room_code: string
}

export type Socket_RoomResetti = {
  room_code: string
  members: User[]
}

export type Config = {
  name: string
  show_logo?: boolean
  default_deck: Deck['name']
  decks: Deck[]
}

export type Deck = {
  name: string
  cards: Card[]
}

export type Card = {
  value: string
  numeric_value?: number
}
