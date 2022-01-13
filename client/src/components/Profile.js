import React from 'react'
import PostList from './PostList.js'

export default function Profile(props){

  const { username } = props
  
  return(
    <>
      <div className="profile">
        <h1 style={{marginBottom: '20px'}}>Welcome {username}!</h1>
        <div className='profile-post-container'>
          <h2 style={{marginBottom: '15px'}}>Your posts</h2>
          <PostList />
        </div>
      </div>
    </>
  )
}