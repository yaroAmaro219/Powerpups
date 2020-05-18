import React, { Component } from 'react'

export default class Login extends Component {

  render() {
    const {handleLogin,  authFormData, handleChange} = this.props
    return (
      <div>
         <div className='login-container'>
        <form className='left-container' onSubmit={handleLogin}>
          <h1 className='sign-in-title'>SIGN IN</h1>
          <div className='input-container'>
            <input name="email" type="text" placeholder='Email' value={authFormData.email} onChange={handleChange} className='input-style' />
            <input name="password" type="password" placeholder='Password' value={authFormData.password} onChange={handleChange} className='input-style' />
          </div>
          <button className='submit-button'> Login</button>
          </form>
        
        <div className='right-container'>
          <div className="need-account">
            <h1 className='account-title'>Need An Account?</h1>
            <button onClick={() => { this.props.history.push('/register') }} className='register-button'>Register</button>
          </div>
        </div>
        </div>
        </div>
    )
  }
}
