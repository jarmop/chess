import React from 'react'

const Moves = ({ moves }: { moves: string[][] }) => (
  <table className="Moves">
    <tbody>
      {moves.map((moveSet, index) => (
        <tr key={index}>
          {moveSet.map((move, index) => (
            <td key={index}>{move}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

export default Moves
