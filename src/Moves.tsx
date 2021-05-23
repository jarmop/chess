import React from 'react'

const Moves = ({
  moves,
  currentMove,
}: {
  moves: string[][]
  currentMove: number
}) => (
  <table className="Moves">
    <tbody>
      {moves.map((moveSet, i) => (
        <tr key={i}>
          {moveSet.map((move, j) => (
            <td
              key={j}
              className={currentMove - 1 === i * 2 + j ? 'selectedMove' : ''}
            >
              {move}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

export default Moves
