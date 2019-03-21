import {useEffect, useState} from 'react'
import React from 'react'
import api from '../api'
import Loading from './Loading'
import {Story, Comment} from '../interface'
import {Button} from 'react-bootstrap'

interface Props {
    id : number
}

export default (props : Props) => {
    const {id} = props
    const [story, setStory] = useState<null | Story>(null)
    const [showComments, setShowComments] = useState(false)
    const [comments, setComments] = useState<null | Comment[]>(null)

    useEffect(() => {
        api.getStoryContent(id)
            .then(data => setStory(data))
    }, [id])

    useEffect(() => {
        if(story === null)
            return
        if(!showComments)
            return
        api.getStoryComments(story)
            .then(comments => setComments(comments))
    }, [showComments])

    if(story === null)
        return <Loading />

    return (
        <div>
        {
            story.title
        }
        <Button onClick={() => setShowComments(!showComments)}>
        {
            showComments ? 'Close' : 'View Comments'
        }
        </Button>
        {
            showComments && comments ? comments.map(d => <div>{d.text}</div>) : null
        }
        </div>
    )
    
}