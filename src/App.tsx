import React from 'react'
import { Game, getGames } from './api'
import './App.css'
import ChessBoard from './ChessBoard'
import { BOARD_SIZE } from './config'
import GameList from './GameList'
import Piece from './Piece'

const App = () => {
  const [games, setGames] = React.useState<Game[]>([])

  React.useEffect(() => {
    getGames().then(setGames)
  }, [setGames])

  const blackPawns = []
  for (let i = 0; i < 8; i++) {
    blackPawns.push(<Piece key={i} color="black" title="pawn" x={i} y={1} />)
  }

  const whitePawns = []
  for (let i = 0; i < 8; i++) {
    whitePawns.push(<Piece key={i} color="white" title="pawn" x={i} y={6} />)
  }

  return (
    <div className="App">
      <svg width={BOARD_SIZE} height={BOARD_SIZE}>
        <ChessBoard />
        <Piece color="black" title="king" x={4} y={0} />
        <Piece color="black" title="queen" x={3} y={0} />
        <Piece color="black" title="rook" x={0} y={0} />
        <Piece color="black" title="rook" x={7} y={0} />
        <Piece color="black" title="bishop" x={2} y={0} />
        <Piece color="black" title="bishop" x={5} y={0} />
        <Piece color="black" title="knight" x={1} y={0} />
        <Piece color="black" title="knight" x={6} y={0} />
        {blackPawns}
        <Piece color="white" title="king" x={4} y={7} />
        <Piece color="white" title="queen" x={3} y={7} />
        <Piece color="white" title="rook" x={0} y={7} />
        <Piece color="white" title="rook" x={7} y={7} />
        <Piece color="white" title="bishop" x={2} y={7} />
        <Piece color="white" title="bishop" x={5} y={7} />
        <Piece color="white" title="knight" x={1} y={7} />
        <Piece color="white" title="knight" x={6} y={7} />
        {whitePawns}
      </svg>
      <GameList games={games} />
    </div>
  )
}

export default App
