import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from './UserProvider.js'

export const IssueContext = React.createContext()

export default function IssueProvider(props){


  const [issueState, setIssueState] = useState([])
  const [currentIssue, setCurrentIssue] = useState({})
  const [commentState, setCommentState] = useState([])
  const { userAxios, user, userState, setUserState, getUserIssues } = useContext(UserContext)

  function getIssues(){
    userAxios.get("/api/issue")
      .then(res => {
        const newState = res.data
        newState.sort((a, b ) => b.score - a.score )
        setIssueState(newState)
        getUserIssues()
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function getIssueById(id){
    userAxios.get(`/api/issue/${id}`)
      .then(res => {
        setCurrentIssue(res.data)
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function editIssue(updates, id) {
    userAxios.put(`/api/issue/${id}`, updates)
      .then(res => {
        console.log(updates)
        console.log(res.data)
        setIssueState(prevState => (
          prevState.map(issue => issue._id !== id ? issue : res.data)
        ))
      })
      .catch(err => console.error(err))
  }

  function addComment(newComment, id) {
    userAxios.post(`/api/comment/${id}`, newComment)
    .then(res => {
      setCommentState(prevState => [...prevState, res.data])
    })
    .catch(err => console.log(err.response.data.errMsg))
  }

  function getComments(id) {
    userAxios.get(`/api/comment/${id}`)
    .then(res => {
      setCommentState(res.data)
    })
    .catch(err => console.error(err))
  }

  // useEffect(() => {
  //   getIssues()
  // }, [])


  return (
    <IssueContext.Provider 
      value={{
        issueState,
        setIssueState,
        currentIssue,
        setCurrentIssue,
        getIssues,
        getIssueById,
        editIssue,
        addComment,
        getComments,
        commentState,
        setCommentState
      }}>
      {props.children}
    </IssueContext.Provider>
  )
}