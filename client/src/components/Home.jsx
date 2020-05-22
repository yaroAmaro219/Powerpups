import React, { Component } from "react";
import ToggleCaret from "./ToggleCaret";
import SearchBar from "./SearchBar";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import PopUp from './PopUp'
import Delete from '../images/delete.svg'

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
      seen: false,
    };
  }

  componentDidMount = async () => {
    const weather = await this.getWeather(this.props.currentUser && this.props.currentUser.location);
    console.log(weather)
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen
    })
  }

  getWeather = async (city) => {
    let resp = await axios(
      `http://api.openweathermap.org/data/2.5/weather?q=London&appid=3e9807f4c3d791c792dc167a5fcadc53/`
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
    console.log(this.props.currentUser && this.props.currentUser.location)
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
                
                <p class="squad" >
                  <p onClick={this.togglePop}>{name.name}
                    </p>
                  {this.state.seen ? <PopUp toggle={this.togglePop} addUser={this.props.addUser} /> : null}
                </p>
                <button class="delete" onClick={() => (this.props.deleteTeam(name.id))}><img src={Delete}/></button>
              </div>)}

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
          <Paper class="groups">
         
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
              
        
            <ToggleCaret teams={this.props.teams} user={this.props.currentUser}/>
          </Paper>
        </div>
        </div>
    );
  }
}
