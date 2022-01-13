import React, { useState, useContext } from 'react'
import { IssueContext } from '../context/IssueProvider.js'
import { UserContext } from '../context/UserProvider.js'

export default function CommentForm(props){

  const [description, setDescription] = useState('')
  const { addComment } = useContext(IssueContext)
  const { user } = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newComment = {
      description: description,
      user: user._id,
      issue: props.id,
      username: user.username
    }
    addComment(newComment, props.id)
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className='comment-form'>
      <input
        type="textarea"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Post a new comment here"
        style={{color: 'rgb(216, 218, 220)', width: '100%'}}
      />
      <input type='submit' value='Add Comment'/>
    </form>
  )
}