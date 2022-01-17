import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export const UserContext = React.createContext()
const baseURL = process.env.REACT_APP_IS_PRODUCTION ? 'https://reddit-rock-the-vote.herokuapp.com' : 'http://localhost:8080'

const userAxios = axios.create( {
  baseURL: baseURL
})

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function UserProvider(props){

  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    issues: [],
    errMsg: ""
  }

  const [userState, setUserState] = useState(initState)
  let history = useHistory()

  function signup(credentials){
    console.log("credentials", credentials)
    axios.post(baseURL + "/auth/signup", credentials)
      .then(res => {
        console.log(res)
        const { user, token } = res.data
        if (user && token) {
          localStorage.setItem("token", token)
          localStorage.setItem("user", JSON.stringify(user))
          setUserState(prevUserState => ({
            ...prevUserState,
            user,
            token
          }))
          .then(history.push('/issues'))
        }
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  function login(credentials){
    axios.post(baseURL + "/auth/login", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        getUserIssues()
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthErr(err.response.data.errMsg))
  }

  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
      issues: [] 
    })
  }

  function handleAuthErr(errMsg){
    setUserState(prevState => ({
      ...prevState,
      errMsg
    }))
  }

  function getUserIssues(){
    userAxios.get("/api/issue/user")
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          issues: res.data
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  function addIssue(newIssue){
    userAxios.post("/api/issue", newIssue)
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          issues: [...prevState.issues, res.data]
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        addIssue,
        userAxios,
        getUserIssues
      }}>
      { props.children }
    </UserContext.Provider>
  )


}
