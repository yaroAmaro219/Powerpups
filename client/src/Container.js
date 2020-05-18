import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'
import GeoLocation from './components/GeoLocation'
import Nav from './components/Nav'

import Login from './components/Login'

import {
  registerUser,
  loginUser,
  verifyUser,
  removeToken
} from './services/api-helper'
import Register from './components/Register'

class Container extends Component {
  constructor() {
    super()

    this.state = {
      currentUser: null,
      authFormData: {
        email: '',
        password: ''
      },
      registerFormData: {
        full_name: '',
        email: '',
        password: ''
      }
    }
  }

  componentDidMount = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({
        currentUser
      })
    }
  }


  //================== AUTH ===================

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    })
  }

  handleVerify = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({
        currentUser
      })
    }
  }

  handleLogin = async (e) => {
    e.preventDefault();
    const currentUser = await loginUser(this.state.registerFormData);
    this.setState({
      currentUser
    })
    this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <Nav />
        <GeoLocation />
        
        <Switch>
          <Route exact path="/login" render={(props) => (
            <Login
              handleLogin={this.handleLogin}
              handleChange={this.handleChane}
              authFormData={this.state.authFormData}
              {...props}/>
          )} />
          <Route exact path="/register" render={(props) => (
            <Register
              handleRegister={this.handleRegister}
              handleChange={this.authHandleChange}
              registerFormData={this.state.authFormData}/>
          )}/>
        </Switch>

      </div>
    )
  }
}

export default withRouter(Container)
