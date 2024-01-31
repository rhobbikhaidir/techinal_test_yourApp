'use client'
import React from 'react'
import { useGetAllGamesMutation } from '../GlobalRedux/api'


const MealsPage = () => {
  const [getAllGames, games] = useGetAllGamesMutation()

  React.useEffect(() => {
    getAllGames()
  }, [])

  console.log(games.data, '***games')
  console.log('rendering')
  return (
    <div>MealsPage

    </div>
  )
}

export default MealsPage