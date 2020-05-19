import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
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
        first_name: '',
        last_name: '',
        location: '',
        email: '',
        phone: '',
        department: '',
        title: '',
        password: ''
      },
      first_name: '',
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

  authHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }))
  }

  registerHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value
      }
    }))
  }

  render() {
    return (
      <div>
        <Nav />
        
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
          )} />
          <Route exact path="/" render={(props) => (
            <Home
              first_name={this.state.first_name}
            />
          )}/>
        </Switch>

      </div>
    )
  }
}

export default withRouter(Container)
