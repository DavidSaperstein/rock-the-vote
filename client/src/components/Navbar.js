import React, { useContext } from 'react'
import { Link } from 'react-router-dom'


export default function Navbar(props){
  const { logout } = props
  const token = localStorage.getItem("token")

  const linkStyles = {
    textDecoration: 'none',
    fontSize: 'calc(10px + 1vw)'
  }

  return (
    <div className='navbar'>
      <Link to ="/profile" style={linkStyles}>Profile</Link>
      <Link to ="/issues" style={linkStyles}>All Issues</Link>
      <Link to ="/newIssue" style={linkStyles}>Create New Issue</Link>
      { token &&
        <Link to ="/" onClick={logout} style={linkStyles}>Logout</Link>
      }
    </div>
  )
}