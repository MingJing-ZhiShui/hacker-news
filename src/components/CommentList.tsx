import React from 'react'
import api from '../api'
import {Comment as CommentInf, Story  as StoryInf} from '../interface'
import {useEffect, useState, SyntheticEvent} from 'react'
import Loading from './Loading'
import cx from 'classnames'
import moment from 'moment'
import './CommentList.scss'

interface CommentProps {
  comment : CommentInf,
  level : number
}

const Comment = (props : CommentProps) => {

  const {comment, level} = props

  return (
    <div className='comment'>
      <div className='weak-font'>
        By {comment.by} on {moment.unix(comment.time).format('DD-MMM-YYYY')}
      </div>
      <div dangerouslySetInnerHTML={{__html : comment.text}} />
      <CommentList parent={comment} level={level + 1} />
    </div>
  )

}

interface CommentListProps {
  parent : StoryInf | CommentInf,
  level : number
}

const CommentList = (props : CommentListProps) => {

  const {parent, level} = props
  const [show, setShow] = useState(false)
  const [comments, setComments] = useState<null | CommentInf[]>(null)
  const [loading, setLoading] = useState(false)

  const handleToggle = (e : SyntheticEvent) => {
    e.preventDefault()
    setShow(!show)
  }

  useEffect(() => {
    if(!show)
      return;
    if(!comments) {
      setLoading(true)
      api.getComments(parent)
        .then(comments => {
          setComments(comments)
          setLoading(false)
        })
    }
  }, [show])

  return (
    <div className='comment-list'>
      <div className='comment-list-toggle'>
        <a href='#' onClick={handleToggle}>
          {parent.kids ? parent.kids.length : 0} {parent.type === 'story' ? 'Comments' : 'Replies'} ({show ? '-' : '+'})
        </a>
      </div>
      {
        loading ? <Loading /> : (
          <div className={cx('comment-list-inner', {hidden : !show})}
            style={{paddingLeft : level * 20}}>
          {
            comments ? comments.map(d => <Comment comment={d} key={d.id} level={level}/>) : null
          }
          </div>
        )
      }
    </div>
  )
}

export {Comment, CommentList}