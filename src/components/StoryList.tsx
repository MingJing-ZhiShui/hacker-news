import {useEffect, useState} from 'react'
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

    if(stories === null)
        return <Loading />

    if(stories.length === 0)
        return <div>Nothing found</div>

    return (
        <div className='story-list'>
        {
            stories.map(d => <StoryItem key={d} id={d} />)
        }
        </div>
    )
    
    
}