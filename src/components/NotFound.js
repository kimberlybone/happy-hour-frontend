import React from 'react'
import { NavLink } from 'react-router-dom'
export default () => {
  return (
    <div>
    <p>404 PAGE NOT FOUND</p>
      < NavLink to='/login' className='button is-primary is-light side-button'>Go Back To Login Page< /NavLink >
    </div>
  )
}
