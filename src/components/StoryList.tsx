import { useEffect, useState } from 'react'
import {Container, Col} from 'react-bootstrap'
import React from 'react'
import Loading from './Loading'
import StoryItem from './StoryItem'
import api from '../api'

export default () => {
  const [stories, setStories] = useState<null | number[]>(null)

  useEffect(() => {
    api.getTopTenStories()
      .then(data => setStories(data))
  }, [])

  if (stories === null)
    return <Container><Loading /></Container>

  if (stories.length === 0)
    return <div>Nothing found</div>

  return (
    <Container className='story-list'>
    {
      stories.map(d => <StoryItem key={d} id={d} />)
    }
    </Container>
  )
}