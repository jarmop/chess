import React from 'react'
import { Game } from './api'

const GameList = ({ games }: { games: Game[] }) => (
  <table>
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
        <tr key={index}>
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
