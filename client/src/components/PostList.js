import React, { useContext, useEffect } from 'react'
import { IssueContext } from '../context/IssueProvider.js'
import { UserContext } from '../context/UserProvider.js'
import { Link } from 'react-router-dom'

export default function PostList(props){

  const { getIssues, getComments, issueState, editIssue } = useContext(IssueContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    getIssues()
  }, [])

  //functional, but score is bugged if you mash the button.
  //possible fix disabling button until res.data comes back?
  const handleUpvote = (issue) => {
    const {_id, upvotes, downvotes} = issue
    if(upvotes.includes(user._id)) {
      issue.upvotes = upvotes.filter(voter => voter !== user._id)
      issue.score--
      editIssue(issue, _id )
    } else {
      if(downvotes.includes(user._id)) {
        issue.downvotes = downvotes.filter(voter => voter !== user._id)
        issue.score++
      }
      issue.upvotes.push(user._id)
      issue.score++
      console.log(issue)
      editIssue(issue , _id )
    }
  }

  const handleDownvote = (issue) => {
    const {_id, upvotes, downvotes} = issue
    if(downvotes.includes(user._id)) {
      const updatedIssue = {...issue}
      const newArray = downvotes.filter(voter => voter !== user._id)
      updatedIssue.downvotes = newArray
      updatedIssue.score++
      editIssue(updatedIssue, _id )
    } else {
      const updatedIssue = {...issue}
      if(upvotes.includes(user._id)) {
        const newArray = upvotes.filter(voter => voter !== user._id)
        updatedIssue.upvotes = newArray
        updatedIssue.score--
      }
      updatedIssue.downvotes.push(user._id)
      updatedIssue.score--
      console.log(updatedIssue)
      editIssue(updatedIssue , _id )
    }
  }

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    paddingLeft: '20px',
    backgroundColor: 'rgb(26, 26, 27)'
  }

  return(
    <ul className='issue-container'>
      {issueState.map(issue => {
        console.log(issue)
        return(
          <li className='list-container'>
            <div className='vote-container'>
              <p onClick={() => handleUpvote(issue)}>/\</p>
              <h2>{issue.score}</h2>
              <p onClick={() => handleDownvote(issue)}>\/</p>
            </div>
            <Link 
              to={`/issues/${issue._id}`} 
              style={linkStyle}
            >
              {issue.title}
            </Link>
          </li> )}
        )}
    </ul>
  )
}