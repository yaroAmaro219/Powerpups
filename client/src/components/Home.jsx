import React, { Component } from "react";
import ToggleCaret from "./ToggleCaret";
import SearchBar from "./SearchBar";
import axios from "axios";
import SearchBar from "./SearchBar";
// import Search from "./Search";

import Paper from '@material-ui/core/Paper';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: {
        teamName: "",
        user_id: "",
      },
      weather: "",
      createButton: null,
    };
  }

  componentDidMount = async () => {
    const weather = await this.getWeather('London');
    console.log(weather)
  };

  getWeather = async (city) => {
    const { currentUser } = this.props;
    const WEATHER_API_KEY = '3e9807f4c3d791c792dc167a5fcadc53';
    // const city = currentUser && currentUser.location;
    let resp = await axios(
      `api.openweathermap.org/data/2.5/weather?q=${city}&appid=381b99ef4a094b85e8bdcab16f20d7aa/`
    );
    let data = resp.data
    console.log(data)
    return resp
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  };

  nameHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      name: {
        ...prevState.team,
        [name]: value,
      },
    }));
  };

  render() {
    console.log(this.props.listOfUsers);
    console.log(this.props.teams)
    console.log(this.props.weather);

    const { userInput, listOfUsers, onSearchChange } = this.props;
    return (
      <div class="home">
        <Paper class="sidebar">
          <img src={""} />
          <h1>My Dashboard</h1>
          <div class="direct-messages">
          <p>Direct Messages</p>
          
          {this.props.listOfUsers
            &&
            this.props.listOfUsers.map((user) => 
              <div class="users-direct-message">
                <p>{user.name}</p>
                </div>
              )}
            </div>
          <p>Groups</p>
          {this.props.teams
            &&
            this.props.teams.map((name) => 
              <div class='group-sidebar'>
                <p>{name.name}
                </p>
                <button class="delete" onClick={() => (this.props.deleteTeam(name.id))}><svg height="18px" viewBox="-40 0 427 427.00131" xmlns="http://www.w3.org/2000/svg"><path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" /><path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" /><path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" /><path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" /></svg></button>
              </div>)}
          {this.props.teams &&
            this.props.teams.map((name) => (
              <form>
                <p>{name.name}</p>

                <button onClick={(e) => ""}>Delete Squad</button>
              </form>
            ))}

          <div class="button-container">
            <button class="logout" onClick={this.props.handleLogout}>
              Logout
            </button>
            <button class="button">Settings</button>
          </div>
        </Paper>
        <div class="main-container">
          <form onSubmit={(e) => this.props.handleSubmit(e)}>
            <SearchBar
              userInput={userInput}
              listOfUsers={listOfUsers}
              onSearchChange={onSearchChange}
            />
          </form>
          {/* <Search
            userInput={userInput}
            listOfUsers={listOfUsers}
            onSearchChange={onSearchChange}
          /> */}
          {/* <SearchBar
            userInput={userInput}
            listOfUsers={listOfUsers}
            onSearchChange={onSearchChange}
          /> */}
          <div class="main">
            <h1>
              Hello{" "}
              {this.props.currentUser && this.props.currentUser.first_name}
            </h1>
            <p>
              It is currently 
               {
                this.state.weather
               }
               
              in 
              <p class="city">
              {this.props.currentUser
                &&
                  this.props.currentUser.location}
                </p>
            </p>
          </div>
          <Paper class="notifications">
            <h1>Here are your latest updates:</h1>
            <p>{""} new messages today</p>
            <p>{""} have birthday's this week</p>
            <p>Happy hour is this thursday at {""}</p>
          </Paper>
          <Paper>
          <div class="groups">
            <div class="teams">
            <h1 class="teams-title">
                Teams{" "}
              </h1>
              
              {this.state.createButton
                ?
                  <button
                  class="create-team-button"
                  onClick={(e) => this.setState({
                    createButton: false
                  })}> - </button>
                :
                <button
                  class="create-team-button"
                  onClick={(e) => this.setState({
                    createButton: true
                  })}> + </button>
                    }
                    
                  
              
         
              {this.state.createButton
                ?
                <form>
                  <input
                    name="name"
                    onChange={this.nameHandleChange}
                    placeholder="Create Team"
                  />
                  <button onClick={(e) => this.props.addTeam(this.state.name, this.props.currentUser && this.props.currentUser.id)}>
                    Create Team
              </button>
                  
                  </form>
                  :
                  null
                }
              </div>
              </div>
          </Paper>
          <Paper class="groups">
            <h1>3 teams</h1>
            <ToggleCaret />
          </Paper>
        </div>
        </div>
    );
  }
}
