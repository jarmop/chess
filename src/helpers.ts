import { Position } from './App'
import { DEFAULT_POSITIONS } from './config'

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const ranks = [8, 7, 6, 5, 4, 3, 2, 1]

const pieceTitleByChar: { [key: string]: string } = {
  K: 'king',
  Q: 'queen',
  R: 'rook',
  B: 'bishop',
  N: 'knight',
}

const pieceCharToTitle = (char: string) =>
  pieceTitleByChar[char] !== undefined ? pieceTitleByChar[char] : 'pawn'

const canMoveTo = (
  piece: Position,
  x: number,
  y: number,
  killHappened: boolean
) => {
  const yDiff = Math.abs(piece.y - y)
  const xDiff = Math.abs(piece.x - x)
  let result = false
  switch (piece.title) {
    case 'pawn':
      result = killHappened
        ? xDiff === 1 && yDiff === 1
        : xDiff === 0 && yDiff > 0 && yDiff < 3
      break
    case 'knight':
      result = (xDiff === 1 && yDiff === 2) || (xDiff === 2 && yDiff === 1)
      break
    case 'bishop':
      result = xDiff === yDiff
      break
    case 'rook':
      result = (xDiff === 0 && yDiff !== 0) || (xDiff !== 0 && yDiff === 0)
      break
    default:
      result = false
  }
  return result
}

const getPositionsAfterCastling = (
  currentPositions: Position[],
  move: string,
  color: string,
  isCastlingKingside: boolean
) => {
  let newPositions = [...currentPositions]

  const indexOfKing = newPositions.findIndex(
    (piece) => piece.color === color && piece.title === 'king'
  )
  newPositions.splice(indexOfKing, 1)
  const indexOfRook = newPositions.findIndex((piece) => {
    if (piece.color !== color || piece.title !== 'rook') {
      return false
    }
    if (isCastlingKingside) {
      return (
        (piece.color === 'white' && piece.x === 7 && piece.y === 7) ||
        (piece.color === 'black' && piece.x === 7 && piece.y === 0)
      )
    } else {
      return (
        (piece.color === 'white' && piece.x === 0 && piece.y === 7) ||
        (piece.color === 'black' && piece.x === 0 && piece.y === 0)
      )
    }
  })
  newPositions.splice(indexOfRook, 1)

  return [
    ...newPositions,
    {
      title: 'king',
      color: color,
      x: isCastlingKingside ? 6 : 2,
      y: color === 'white' ? 7 : 0,
    },
    {
      title: 'rook',
      color: color,
      x: isCastlingKingside ? 5 : 3,
      y: color === 'white' ? 7 : 0,
    },
  ]
}

export const getNextPositions = (
  currentPositions: Position[],
  move: string,
  color: string
) => {
  const isCastlingKingside = move === 'O-O'
  const isCastlingQueenside = move === 'O-O-O'

  if (isCastlingKingside || isCastlingQueenside) {
    return getPositionsAfterCastling(
      currentPositions,
      move,
      color,
      isCastlingKingside
    )
  }

  let newPositions = [...currentPositions]

  const moveParts = move.replace(/#|\+/g, '').split('').reverse()
  const rank = parseInt(moveParts[0])
  const y = ranks.indexOf(rank)
  const file = moveParts[1]
  const x = files.indexOf(file)
  let killHappened = false
  if (moveParts[2] === 'x') {
    killHappened = true
    const indexOfKilledPiece = newPositions.findIndex(
      (piece) => piece.x === x && piece.y === y
    )
    newPositions.splice(indexOfKilledPiece, 1)
    moveParts.splice(2, 1)
  }

  let originX: number | undefined
  if (files.includes(moveParts[2])) {
    const originFile = moveParts[2]
    originX = files.indexOf(originFile)
    moveParts.splice(2, 1)
  }

  const pieceChar = moveParts[2]
  const pieceTitle = pieceCharToTitle(pieceChar)

  const indexOfMovedPiece = newPositions.findIndex((piece) => {
    if (
      piece.title !== pieceTitle ||
      piece.color !== color ||
      (originX && piece.x !== originX)
    ) {
      return false
    }
    const isUniquePiece = ['king', 'queen'].includes(pieceTitle)
    if (isUniquePiece) {
      return true
    }

    return canMoveTo(piece, x, y, killHappened)
  })
  indexOfMovedPiece >= 0 && newPositions.splice(indexOfMovedPiece, 1)

  return [
    ...newPositions,
    {
      title: pieceTitle,
      color: color,
      x,
      y,
    },
  ]
}

export const generateGamePositionsFromMoves = (moves: string[][]) => {
  const positionsAfterMove = [DEFAULT_POSITIONS]
  moves.flat().forEach((move, index) => {
    const currentPositions = positionsAfterMove[positionsAfterMove.length - 1]
    const color = index % 2 === 0 ? 'white' : 'black'
    const nextPositions = getNextPositions(currentPositions, move, color)
    positionsAfterMove.push(nextPositions)
  })

  return positionsAfterMove
}
