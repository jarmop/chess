import React from 'react'
import { Game } from './api'

interface GameListProps {
  games: Game[]
  selectedGame?: Game | undefined
  onSelectGame?: (game: Game) => void
}

const GameList = ({ games, selectedGame, onSelectGame }: GameListProps) => (
  <table className="GameList">
    <thead>
      <tr>
        <th>End date</th>
        <th>White</th>
        <th>Black</th>
        <th>Moves</th>
        <th>Termination</th>
      </tr>
    </thead>
    <tbody>
      {games.map((game, index) => (
        <tr
          key={index}
          className={game.id === selectedGame?.id ? 'selectedGame' : ''}
          onClick={() => onSelectGame && onSelectGame(game)}
        >
          <td>{game.endDate}</td>
          <td>{game.white}</td>
          <td>{game.black}</td>
          <td>{game.moves.length}</td>
          <td>{game.termination}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default GameList
