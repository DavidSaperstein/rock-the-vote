import React from 'react'

export default function Comment(props) {

  return (
    <div className='comment-container'>
      <h3>Posted by {props.username}</h3>
      <p>{props.description}</p>
    </div>
  )
}