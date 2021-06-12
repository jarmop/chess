import { USERNAME_ME, USERNAME_NARODITSKY } from './config'

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

const getCacheKey = (username: string) => {
  const today = new Date()
  today.setMinutes(0, 0, 0)
  return `${username}-games-${today.getTime()}`
}

const getGamesFromCache = (username: string): Game[] | undefined => {
  const gamesFromCache = localStorage.getItem(getCacheKey(username))
  return gamesFromCache !== null ? JSON.parse(gamesFromCache) : undefined
}

const storeGamesToCache = (username: string, games: Game[]) =>
  localStorage.setItem(getCacheKey(username), JSON.stringify(games))

const fetchMonthlyGamesUrls = (username: string): Promise<string[]> =>
  fetch(`https://api.chess.com/pub/player/${username}/games/archives`)
    .then((response) => response.json())
    .then((data) => data.archives)

const fetchGames = (url: string): Promise<Game[]> =>
  fetch(url)
    .then((response) => response.json())
    .then((data): Game[] => data.games.map(parseGame))

const getGames = (username: string): Promise<Game[]> => {
  const gamesFromCache = getGamesFromCache(username)
  if (gamesFromCache !== undefined) {
    return Promise.resolve(gamesFromCache)
  }

  return fetchMonthlyGamesUrls(username)
    .then((monthlyGamesUrls) => Promise.all(monthlyGamesUrls.map(fetchGames)))
    .then((monthlyGames) => monthlyGames.flat())
    .then((games) => {
      storeGamesToCache(username, games)
      return games
    })
}

export const getMyGames = () => getGames(USERNAME_ME)

export const getNaroditskyGames = () => getGames(USERNAME_NARODITSKY)
