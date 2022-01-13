import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from './../context/UserProvider.js'
import { IssueContext } from './../context/IssueProvider.js'



export default function PostForm(props){

  const { user, addIssue  } = useContext(UserContext)
  const { issueState, setIssueState } = useContext(IssueContext)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imgUrl, setImgUrl] = useState("")

  
  let history = useHistory()
  
  // function handleChange(e){
  //   const {name, value} = e.target
  //   setInputs(prevInputs => ({
  //     ...prevInputs,
  //     [name]: value
  //   }))
  // }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    let dateAdded = new Date().toString()
    const newIssue = {
      title: title,
      description: description,
      imgUrl: imgUrl,
      dateAdded: dateAdded,
      upvotes: [],
      downvotes: [],
      user: user._id,
      score: 0
    }
    addIssue(newIssue)
    setIssueState(prevState => [ ...prevState, newIssue ])
    console.log(issueState)
    setTitle("")
    setDescription("")
    setImgUrl("")
    history.push("/issues")
  }

  return (
    <div className='form-container-container'>
      <form onSubmit={handleSubmit} className='form-container'>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className='inputs'
        />
        <input
          type="text"
          name="imgUrl"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          placeholder="Image URL"
          className='inputs'
        />
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className='inputs'
          style={{color: 'rgb(216, 218, 220)'}}
          wrap='hard'
          rows='10'
          col='30'
          resize='vertical'
        />
        <input type="submit" value="Post"/>
      </form>
    </div>
  )
}