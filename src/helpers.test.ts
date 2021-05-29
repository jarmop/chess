import { getNextPositions } from './helpers'

it('getNextPositions', () => {
  const whiteKing = { color: 'white', title: 'king', x: 4, y: 7 }
  const currentPositions = [whiteKing]
  const move = 'Ke2'
  const expectedPositions = [{ ...whiteKing, y: 6 }]
  const newPositions = getNextPositions(currentPositions, move, whiteKing.color)
  expect(newPositions).toEqual(expectedPositions)
})
