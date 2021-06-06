import { MY_USERNAME } from './config'

export type Game = {
  black: string
  endDate: string
  id: string
  moves: string[][]
  termination: string
  white: string
  url: string
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

const parseGame = (game: any): Game => ({
  ...parsePgn(game.pgn),
  url: game.url,
})

const getCacheKey = () => {
  const today = new Date()
  today.setMinutes(0, 0, 0)
  return `games-${today.getTime()}`
}

const getGamesFromCache = (): Game[] | undefined => {
  const gamesFromCache = localStorage.getItem(getCacheKey())
  return gamesFromCache !== null ? JSON.parse(gamesFromCache) : undefined
}

const storeGamesToCache = (games: Game[]) =>
  localStorage.setItem(getCacheKey(), JSON.stringify(games))

export const getGames = (): Promise<Game[]> => {
  const gamesFromCache = getGamesFromCache()
  if (gamesFromCache !== undefined) {
    return Promise.resolve(gamesFromCache)
  }

  return fetch(`https://api.chess.com/pub/player/${MY_USERNAME}/games/2021/05`)
    .then((response) => response.json())
    .then((data): Game[] => data.games.map(parseGame))
    .then((games) => {
      storeGamesToCache(games)
      return games
    })
}
