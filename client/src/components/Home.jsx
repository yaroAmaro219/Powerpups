import React, { Component } from "react";
import ToggleCaret from "./ToggleCaret";
import SearchBar from "./SearchBar";
import axios from "axios";
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
        <div class="sidebar">
          <img src={""} />
          <h1>My Dashboard</h1>
          <p>Direct Messages</p>
          <ul>
            <li>Tim</li>
            <li>Jim</li>
            <li>Bean</li>
          </ul>
          <p>Groups</p>
          {this.props.teams &&
            this.props.teams.map((name) =>
              <p>{name.name}</p>
            )}

          <div class="button-container">
            <button class="logout" onClick={this.props.handleLogout}>
              Logout
            </button>
            <button class="button">Settings</button>
          </div>
        </div>
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
              It is currently in
              {}
              Sydney, Australia
            </p>
          </div>
          <div class="notifications">
            <h1>Here are your latest updates:</h1>
            <p>{""} new messages today</p>
            <p>{""} have birthday's this week</p>
            <p>Happy hour is this thursday at {""}</p>
          </div>
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
            <ToggleCaret />
          </div>
        </div>
    );
  }
}
