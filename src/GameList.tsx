import React from 'react'
import { Game } from './api'

interface GameListProps {
  games: Game[]
  onSelectGame: (game: Game) => void
}

const GameList = ({ games, onSelectGame }: GameListProps) => (
  <table className="GameList">
    <thead>
      <tr>
        <th>End date</th>
        <th>Opponent</th>
        <th>Moves</th>
        <th>Termination</th>
      </tr>
    </thead>
    <tbody>
      {games.map((game, index) => (
        <tr key={index} onClick={() => onSelectGame(game)}>
          <td>{game.endDate}</td>
          <td>{game.opponent}</td>
          <td>{game.moves.length}</td>
          <td>{game.termination}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default GameList
