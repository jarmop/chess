import React from 'react'
import { ReactComponent as BlackKing } from './svg/BlackKing.svg'
import { ReactComponent as BlackQueen } from './svg/BlackQueen.svg'
import { ReactComponent as BlackRook } from './svg/BlackRook.svg'
import { ReactComponent as BlackBishop } from './svg/BlackBishop.svg'
import { ReactComponent as BlackKnight } from './svg/BlackKnight.svg'
import { ReactComponent as BlackPawn } from './svg/BlackPawn.svg'
import { ReactComponent as WhiteKing } from './svg/WhiteKing.svg'
import { ReactComponent as WhiteQueen } from './svg/WhiteQueen.svg'
import { ReactComponent as WhiteRook } from './svg/WhiteRook.svg'
import { ReactComponent as WhiteBishop } from './svg/WhiteBishop.svg'
import { ReactComponent as WhiteKnight } from './svg/WhiteKnight.svg'
import { ReactComponent as WhitePawn } from './svg/WhitePawn.svg'
import { SQUARE_SIZE } from './config'

type SVGComponent = typeof BlackKing

type ComponentByColorByTitle = {
  [key: string]: {
    [key: string]: SVGComponent
  }
}

const componentByColorByTitle: ComponentByColorByTitle = {
  black: {
    king: BlackKing,
    queen: BlackQueen,
    rook: BlackRook,
    bishop: BlackBishop,
    knight: BlackKnight,
    pawn: BlackPawn,
  },
  white: {
    king: WhiteKing,
    queen: WhiteQueen,
    rook: WhiteRook,
    bishop: WhiteBishop,
    knight: WhiteKnight,
    pawn: WhitePawn,
  },
}

const Piece = ({ title = '', color = '', x = 0, y = 0 }) => {
  const component = componentByColorByTitle[color]?.[title]
  if (component === undefined) {
    return null
  }
  return React.createElement(component, {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    viewBox: '0 1 45 45',
    x: x * SQUARE_SIZE,
    y: y * SQUARE_SIZE,
  })
}

export default Piece
