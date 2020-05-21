import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'
import axios from 'axios'
import Login from './components/Login'
// import {WEATHER_API_KEY} from './config'

import {
  registerUser,
  loginUser,
  verifyUser,
  removeToken,
  postTeam,
  showTeam,
  destroyTeam,
  putUser
} from './services/api-helper'
import Register from './components/Register'
import Axios from 'axios'

class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null,
      searchInput: '',
      userSearchResults: [],
      listOfUsers: [],
      selectedOption: [],
      loading: false,
      authFormData: {
        email: '',
        password: ''
      },
      registerFormData: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        department: '',
        title: '',
        location: '',
        phone: '',
        image: null,
      },
      weather: '',
      search: '',
      newTeam: '',
      teams: '',
      team:''
    }
  }

  componentDidMount = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({
        currentUser,
      });
    }
    this.getTeam();
    const userResponse = await axios.get(`http://localhost:3000/users`);
    const listOfUsers = userResponse.data;
    console.log(listOfUsers)
    this.setState({
      listOfUsers,
     });
  }

  addTeam = async (e) => {
    const newTeam = await postTeam(e)
    this.setState({
      newTeam
    })
  }

  getTeam = async () => {
    const teams = await showTeam();
    this.setState({teams})
  }

  deleteTeam = async (id) => {
    const team = await destroyTeam(id);
    this.setState({team})
  }

  updateUser = async (id, userData) => {
    const currentUser = await putUser(id, userData);
    this.setState({currentUser})
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
    const currentUser = await loginUser(this.state.authFormData);
    this.setState({
      currentUser
    })
    this.props.history.push("/")
  }

  handleLogout = async(id, params) => {
    const status = await putUser(id, params)
    localStorage.removeItem("jwt");
    this.setState({currentUser: null})
    removeToken();
    this.props.history.push("/login")
  }

  handleRegister = async (e) => {
    e.preventDefault();
    const currentUser = await registerUser(this.state.registerFormData);
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

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    })
  }  

  handleSubmit = (e) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    }) 
  }

  searchForUsers = async () => {
    this.setState({ loading: true });
    const res = await axios.get(`http://localhost:3000/users`);
    const userSearchResults = res;
    this.setState({
      userSearchResults,
      loading: false
    });
  }

  onSearchChange = async (e) => {
    this.searchForUsers(e.target.value);
    this.setState({
      searchInput: e.target.value
    });
  }

  render() {
    console.log(this.state.teams)
    return (
      <div>
        <Switch>
          <Route exact path="/login" render={(props) => (
            <Login
              handleLogin={this.handleLogin}
              handleChange={this.authHandleChange}
              authFormData={this.state.authFormData}
              {...props}/>
          )} />
          <Route exact path="/register" render={(props) => (
            <Register
              handleRegister={this.handleRegister}
              handleChange={this.registerHandleChange}
              registerFormData={this.state.registerFormData}
             />
          )} />
          <Route exact path="/" render={(props) => (
            <Home
              {...props}
              handleLogout={this.handleLogout}
              currentUser={this.state.currentUser}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              search={this.state.search}
              userInput={this.state.userInput}
              listOfUsers={this.state.listOfUsers}
              userSearchResults={this.state.userSearchResults}
              onSearchChange={this.onSearchChange}
              teams={this.state.teams}
              addTeam={this.addTeam}
            />
          )}/>
          {/* <Route exact path="/search-bar" render={(props) => (
            <SearchBar 
              userInput={this.state.userInput}
              listOfUsers={this.state.listOfUsers}
              userSearchResults={this.state.userSearchResults}
              onSearchChange={this.onSearchChange}

            />
          )} /> */}
        </Switch>
      </div>
    )
  }
}

export default withRouter(Container);
