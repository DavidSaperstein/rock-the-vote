import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import PostList from './components/PostList.js'
import PostForm from './components/PostForm.js'
import Post from './components/Post.js'
import { UserContext } from './context/UserProvider.js'
import { IssueContext } from './context/IssueProvider.js'


export default function App(){
  const { user, token, logout, login, signup, addIssue } = useContext(UserContext)
  const { getIssues } = useContext(IssueContext)

  return (
    <div className="app">
      <Navbar logout={logout}/>
      <Switch>
        <Route
          exact path="/"
          render={() => token ? <Redirect to="/issues"/> : <Auth login={login} signup={signup}/>}
        />
        <Route
          path="/profile"
          render={() => <Profile username={user.username}/>}
        />
        <Route
          exact path="/issues"
          render={() => <PostList />}
        />
        <Route
          path="/newissue"
          render={() => <PostForm addIssue={addIssue} />}
        />
        <Route
          path="/issues/:issueId"
          render={() => <Post />}
        />
      </Switch>
      

    </div>
  )
}
