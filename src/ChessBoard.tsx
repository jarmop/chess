import React from 'react'
import { BOARD_SIZE } from './config'

const ChessBoard = ({ size = 0 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={BOARD_SIZE}
    height={BOARD_SIZE}
    viewBox="1 0.5 8 8"
  >
    <circle r="99" fill="#999" />
    <path
      d="M1,1h7M2,2h7M1,3h7M2,4h7M1,5h7M2,6h7M1,7h7M2,8h7"
      stroke="#eee"
      strokeDasharray="1"
    />
  </svg>
)

export default ChessBoard
