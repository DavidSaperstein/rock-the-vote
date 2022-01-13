import React from 'react'

export default function AuthForm(props){
  const {
    handleChange,
    handleSubmit,
    btnText,
    inputs: {
      username,
      password
    }
  } = props

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        name="username"
        onChange={handleChange}
        placeholder="Username"
        style={{color: 'rgb(216, 218, 220)'}}
      />
      <input
        type="text"
        value={password}
        name="password"
        onChange={handleChange}
        placeholder="Password"
        style={{color: 'rgb(216, 218, 220)'}}
      />
      <input type="submit" value={btnText}/>
    </form>
  )
}