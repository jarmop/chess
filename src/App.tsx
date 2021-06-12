import React from 'react'
import { Game, getMyGames } from './api'
import './App.css'
import ChessBoard from './ChessBoard'
import {
  BOARD_SIZE,
  DEFAULT_POSITIONS,
  INITIAL_GAME,
  INITIAL_MOVE,
  MOCK_POSITIONS_AFTER_MOVES,
} from './config'
import GameList from './GameList'
import { generateGamePositionsFromMoves } from './helpers'
import Moves from './Moves'
import Piece from './Piece'

export type Position = {
  color: string
  title: string
  x: number
  y: number
}

export type PositionsAfterMove = Position[][]

const App = () => {
  const [games, setGames] = React.useState<Game[]>([])
  const [selectedGame, selectGame] = React.useState<Game>()
  const [currentMove, setCurrentMove] = React.useState<number>(0)
  const [positionsAfterMove, setPositionsAfterMove] =
    React.useState<PositionsAfterMove>([
      DEFAULT_POSITIONS,
      ...MOCK_POSITIONS_AFTER_MOVES,
    ])

  React.useEffect(() => {
    getMyGames().then((games) => {
      setGames(games)
      handleSelectGame(games[INITIAL_GAME])
    })
  }, [setGames])

  const handleSelectGame = (game: Game) => {
    selectGame(game)
    setPositionsAfterMove(generateGamePositionsFromMoves(game.moves))
    setCurrentMove(INITIAL_MOVE)
  }

  const gotoNextMove = () =>
    currentMove < positionsAfterMove.length - 1 &&
    setCurrentMove(currentMove + 1)

  const gotoPreviousMove = () =>
    currentMove > 0 && setCurrentMove(currentMove - 1)

  const currentPositions =
    currentMove !== undefined && positionsAfterMove !== undefined
      ? positionsAfterMove[currentMove]
      : DEFAULT_POSITIONS

  return (
    <div className="App">
      <div className="Game">
        <div>
          <div className="player">{selectedGame?.black}</div>
          <svg width={BOARD_SIZE} height={BOARD_SIZE}>
            <ChessBoard />
            {currentPositions.map((position, index) => (
              <Piece key={index} {...position} />
            ))}
          </svg>
          <div className="player">{selectedGame?.white}</div>
          <div>
            <button onClick={gotoPreviousMove}>{'<'}</button>
            <button onClick={gotoNextMove}>{'>'}</button>
          </div>
          <div>
            <a href={selectedGame?.url}>Chess.com</a>
          </div>
        </div>
        {selectedGame !== undefined && (
          <Moves moves={selectedGame.moves} currentMove={currentMove} />
        )}
      </div>
      <GameList
        games={games}
        selectedGame={selectedGame}
        onSelectGame={handleSelectGame}
      />
    </div>
  )
}

export default App
