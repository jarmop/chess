import { PositionsAfterMove } from './App'

export const USERNAME_ME = 'jarmopih'
export const USERNAME_NARODITSKY = 'SenseiDanya'
export const BOARD_SIZE = 500
export const AMOUNT_OF_SQUARES = 8
export const SQUARE_SIZE = BOARD_SIZE / AMOUNT_OF_SQUARES
export const INITIAL_GAME = 0
export const INITIAL_MOVE = 0

export const DEFAULT_POSITIONS = [
  { color: 'black', title: 'king', x: 4, y: 0 },
  { color: 'black', title: 'queen', x: 3, y: 0 },
  { color: 'black', title: 'rook', x: 0, y: 0 },
  { color: 'black', title: 'rook', x: 7, y: 0 },
  { color: 'black', title: 'bishop', x: 2, y: 0 },
  { color: 'black', title: 'bishop', x: 5, y: 0 },
  { color: 'black', title: 'knight', x: 1, y: 0 },
  { color: 'black', title: 'knight', x: 6, y: 0 },
  { color: 'black', title: 'pawn', x: 0, y: 1 },
  { color: 'black', title: 'pawn', x: 1, y: 1 },
  { color: 'black', title: 'pawn', x: 2, y: 1 },
  { color: 'black', title: 'pawn', x: 3, y: 1 },
  { color: 'black', title: 'pawn', x: 4, y: 1 },
  { color: 'black', title: 'pawn', x: 5, y: 1 },
  { color: 'black', title: 'pawn', x: 6, y: 1 },
  { color: 'black', title: 'pawn', x: 7, y: 1 },
  { color: 'white', title: 'king', x: 4, y: 7 },
  { color: 'white', title: 'queen', x: 3, y: 7 },
  { color: 'white', title: 'rook', x: 0, y: 7 },
  { color: 'white', title: 'rook', x: 7, y: 7 },
  { color: 'white', title: 'bishop', x: 2, y: 7 },
  { color: 'white', title: 'bishop', x: 5, y: 7 },
  { color: 'white', title: 'knight', x: 1, y: 7 },
  { color: 'white', title: 'knight', x: 6, y: 7 },
  { color: 'white', title: 'pawn', x: 0, y: 6 },
  { color: 'white', title: 'pawn', x: 1, y: 6 },
  { color: 'white', title: 'pawn', x: 2, y: 6 },
  { color: 'white', title: 'pawn', x: 3, y: 6 },
  { color: 'white', title: 'pawn', x: 4, y: 6 },
  { color: 'white', title: 'pawn', x: 5, y: 6 },
  { color: 'white', title: 'pawn', x: 6, y: 6 },
  { color: 'white', title: 'pawn', x: 7, y: 6 },
]

export const MOCK_POSITIONS_AFTER_MOVES: PositionsAfterMove = [
  [
    { color: 'black', title: 'king', x: 4, y: 0 },
    { color: 'white', title: 'king', x: 4, y: 6 },
  ],

  [
    { color: 'black', title: 'king', x: 4, y: 1 },
    { color: 'white', title: 'king', x: 4, y: 6 },
  ],
]
