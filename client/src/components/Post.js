import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Comment from './Comment.js'
import CommentForm from './CommentForm.js'
import { IssueContext } from '../context/IssueProvider.js'

export default function Post(props){

  const { issueId } = useParams()

  const { currentIssue, getIssueById, issueState, commentState, getComments} = useContext(IssueContext)

  // const title = issueState.find(issue => issue._id === issueId).title
  // const description = issueState.find(issue => issue._id === issueId).description

  useEffect(() => {
    getIssueById(issueId)
    getComments(issueId)
  }, [])

  console.log(currentIssue.imgUrl)

  return (
    <div className='post-page-container'>
      <div className="post-container">
        <h2 style={{
          marginBottom: '20px', 
          border: 'solid rgb(100, 100, 102) 1px'
        }}>
          {currentIssue.title}
        </h2>
        {currentIssue?.imgUrl && 
          <img 
            src={currentIssue.imgUrl} 
            style={{marginBottom: '20px', border: 'solid rgb(100, 100, 102) 1px'}}
          />}
        <p style={{marginBottom: '20px'}}>{currentIssue.description}</p>
      </div>
      <CommentForm id={issueId}/>
      {commentState.map(comment => {
        return (
        <Comment
          description={comment.description}
          username={comment.username}
        />
        )
      })}
    </div>

  )
}