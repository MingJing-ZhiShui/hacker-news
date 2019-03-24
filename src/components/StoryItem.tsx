import { useEffect, useState } from 'react'
import React from 'react'
import api from '../api'
import Loading from './Loading'
import { Story, Comment } from '../interface'
import moment from 'moment'
import {CommentList} from './CommentList'
import './StoryItem.scss'

interface Props {
  id: number
}

export default (props: Props) => {
  const { id } = props
  const [story, setStory] = useState<null | Story>(null)

  useEffect(() => {
    api.getStoryContent(id)
      .then(data => setStory(data))
  }, [id])

  if (story === null)
    return <Loading />

  return (
    <div className='story-item'>
      <div className='story-item-header'>
        By {story.by} on {moment.unix(story.time).format('DD-MMM-YYYY')}
      </div>
      <div>
        <a href={story.url} target='_blank'>{story.title}</a>
      </div>
      <CommentList parent={story} level={1} />
    </div>
  )

}