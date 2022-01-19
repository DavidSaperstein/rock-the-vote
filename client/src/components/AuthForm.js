import React from 'react'

export default function AuthForm(props){
  const {
    handleChange,
    handleLogin,
    btnText,
    inputs: {
      username,
      password
    }
  } = props

  return (
    <form className='auth-form' onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        name="username"
        onChange={handleChange}
        placeholder="Username"
        style={{color: 'rgb(216, 218, 220)'}}
      />
      <input
        type="password"
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