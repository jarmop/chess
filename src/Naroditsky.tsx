import React from 'react'
import { Game, getNaroditskyGames } from './api'
import GameList from './GameList'

const Naroditsky = () => {
  const [games, setGames] = React.useState<Game[]>([])

  React.useEffect(() => {
    getNaroditskyGames().then(setGames)
  }, [setGames])

  return <GameList games={games} />
}

export default Naroditsky
