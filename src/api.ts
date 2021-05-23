import { MY_USERNAME } from './config'
import mockGames from './mockGames.json'

export type Game = {
  black: string
  endDate: string
  id: string
  moves: string[][]
  termination: string
  white: string
}

const RELEVANT_PGN_KEYS = ['Black', 'EndDate', 'Link', 'Termination', 'White']

const isRelevantPgnKey = (key: string) => RELEVANT_PGN_KEYS.includes(key)

const pascalCaseToCamelCase = (string: string) =>
  string.charAt(0).toLowerCase() + string.slice(1)

const parsePgnTagPairs = (pgnTagPairs: string) => {
  const keyValueTuples = pgnTagPairs
    .split('\n')
    .map((row) => row.replace('[', '').replace('"]', '').split(' "'))
    .filter(([key, _]) => isRelevantPgnKey(key))

  const valueByKey = keyValueTuples.reduce(
    (acc: { [key: string]: string }, [key, value]) => {
      acc[pascalCaseToCamelCase(key)] = value
      return acc
    },
    {}
  )

  return {
    black: valueByKey.black,
    endDate: valueByKey.endDate,
    id: valueByKey.link.replace(/.*\//, ''),
    termination: valueByKey.termination,
    white: valueByKey.white,
  }
}

const parsePgnMoves = (pgnMoves: string) =>
  pgnMoves
    .replace(/\{[^}]+\}/g, '')
    .replace(/\d-\d\n$/, '')
    .split(/\d+\.\s/)
    .slice(1)
    .map((moveRow) => moveRow.trim().split(/\s\s\d+...\s/))

const parsePgn = (pgn: string) => {
  const [pgnTagPairs, pgnMoves] = pgn.split('\n\n')

  const game = {
    ...parsePgnTagPairs(pgnTagPairs),
    moves: parsePgnMoves(pgnMoves),
  }

  return game
}

const parseGame = (game: any): Game => parsePgn(game.pgn)

export const getGames = () =>
  process.env.NODE_ENV === 'development'
    ? Promise.resolve(mockGames.games.map(parseGame))
    : fetch(`https://api.chess.com/pub/player/${MY_USERNAME}/games/2021/05`)
        .then((response) => response.json())
        .then((data): Game[] => data.games.map(parseGame))
