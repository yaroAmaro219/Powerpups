import React, { Component } from "react";
import ToggleCaret from "./ToggleCaret";
import SearchBar from "./SearchBar";
import axios from "axios";
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
    };
  }

  componentDidMount = async () => {
    const weather = await this.getWeather();
  };

  getWeather = async () => {
    const { currentUser } = this.props;
    const city = currentUser && currentUser.location;
    const weather = await axios.get(
      `https://www.wunderground.com/weather/gb/${this.state.city}/`
    );
    this.setState({ weather });
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
    console.log(this.props.teams);
    const { userInput, listOfUsers, onSearchChange } = this.props;
    return (
      <div class="home">
        <Paper class="sidebar">
          <img src={""} />
          <h1>My Dashboard</h1>
          <p>Direct Messages</p>
          <ul>
            <li>Tim</li>
            <li>Jim</li>
            <li>Bean</li>
          </ul>
          <p>Groups</p>
          {this.props.teams
            &&
            this.props.teams.map((name) => 
              <div class='group-sidebar'>
                <p>{name.name}
                </p>
                <button onSubmit={(e) => this.props.history.push('/')}onClick={(e) => {this.props.deleteTeam(name.id)} }>Delete Squad</button>
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
              It is currently in
              {}
              Sydney, Australia
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
            <h1>
              Teams{" "}
              <button class="create-team-button" onClick={""}>
                +
              </button>
            </h1>
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
