const MY_USERNAME = 'jarmopih'

const notMe = (username: string) => username !== MY_USERNAME

export type Game = {
  endDate: string
  moves: string[][]
  opponent: string
  termination: string
}

export type Move = {
  black: string
  white: string
}

const RELEVANT_PGN_KEYS = ['Black', 'EndDate', 'Termination', 'White']

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

  const players = [valueByKey.white, valueByKey.black]
  const opponent = players.filter(notMe).pop() || ''

  return {
    endDate: valueByKey.endDate,
    opponent,
    termination: valueByKey.termination,
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
  fetch('https://api.chess.com/pub/player/jarmopih/games/2021/05')
    .then((response) => response.json())
    .then((data): Game[] => data.games.map(parseGame))
// .then((data): Game[] => [parseGame(data.games[2])])
