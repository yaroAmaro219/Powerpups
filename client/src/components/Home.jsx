import React, { Component } from "react";
import ToggleCaret from "./ToggleCaret";
import SearchBar from "./SearchBar";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import PopUp from "./PopUp";
import Delete from "../images/delete.svg";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: {
        teamName: "",
        user_id: "",
      },
      edit: false,
      weather: "",
      createButton: null,
      seen: false,
      setting: false,
    };
  }

  componentDidMount = async () => {
    const weather = await this.getWeather();
    this.setState({weather})
    console.log(weather);
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
  };

  toggleSet = () => {
    this.setState({
      setting: !this.state.setting,
    });
  };

  getWeather = async (city) => {
    let resp = await axios(
      `http://api.openweathermap.org/data/2.5/weather?${city}&appid=b4f8c7c8fac2ad5dd7b14b760bd9230c/`
    );
    console.log(resp.data);
    return resp.data;
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
    console.log(this.props.currentUser && this.props.currentUser.id);

    const { userInput, listOfUsers, onSearchChange } = this.props;
    return (
      <div className="home">
        <Paper className="sidebar">
          <img src={""} />
          <h1 className="side-bar-header">My Dashboard</h1>
          <div classname="direct-messages">
            <p>Direct Messages</p>

            {this.props.listOfUsers &&
              this.props.listOfUsers.map((user) => (
                <div className="users-direct-message">
                  <p>{user.name}</p>
                </div>
              ))}
          </div>
          <p>Groups</p>
          {this.props.teams &&
            this.props.teams.map((name) => (
              <div className="group-sidebar">
                <p className="squad">
                  <p onClick={this.togglePop}>{name.name}</p>
                  {this.state.seen ? (
                    <PopUp
                      toggle={this.togglePop}
                      addUser={this.props.addUser}
                    />
                  ) : null}
                </p>
                <button
                  className="delete"
                  onClick={() => this.props.deleteTeam(name.id)}
                >
                  <img src={Delete} />
                </button>
              </div>
            ))}

          <div className="button-container">
            <button className="logout" onClick={this.props.handleLogout}>
              Logout
            </button>
            <button className="button" onClick={this.toggleSet}>
              Settings
            </button>
            {this.state.setting ? (
              <div className="settings-container">
                {this.state.edit ? (
                  <form>
                    <input
                      onChange={this.props.userHandleChange}
                      name="first_name"
                      value={this.props.user.first_name}
                      placeholder="First Name"
                    />
                    <input
                      onChange={this.props.userHandleChange}
                      name="last_name"
                      value={this.props.user.last_name}
                      placeholder="Last Name"
                    />
                    <input
                      name="location"
                      value={this.props.user.location}
                      placeholder="Location"
                      onChange={this.props.userHandleChange}
                    />
                    <input
                      name="phone"
                      value={this.props.user.phone}
                      placeholder="Phone"
                      onChange={this.props.userHandleChange}
                    />
                    <input
                      name="birthday"
                      value={this.props.user.birthday}
                      placeholder="Birthday"
                      onChange={this.props.userHandleChange}
                    />
                    <input
                      name="pronoun"
                      value={this.props.user.pronoun}
                      placeholder="Pronoun"
                      onChange={this.props.userHandleChange}
                    />
                    <input
                      name="status"
                      value={this.props.user.status}
                      placeholder="Status"
                      onChange={this.props.userHandleChange}
                    />
                  </form>
                ) : (
                  <div>
                    <p>
                      {this.props.currentUser &&
                        this.props.currentUser.first_name}
                    </p>
                    <p>
                      {this.props.currentUser &&
                        this.props.currentUser.last_name}
                    </p>
                    <p>
                      {this.props.currentUser &&
                        this.props.currentUser.location}
                    </p>
                    <p>
                      {this.props.currentUser && this.props.currentUser.title}
                    </p>
                    <p>
                      {this.props.currentUser &&
                        this.props.currentUser.department}
                    </p>
                    <p>
                      {this.props.currentUser && this.props.currentUser.phone}
                    </p>
                  </div>
                )}
                <div className="buttons-below-edit">
                  <button
                    onClick={(e) => {
                      this.setState({ edit: !this.state.edit });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      this.props.updateUser(
                        this.props.currentUser && this.props.currentUser.id,
                        this.props.user
                      );
                    }}
                  >
                    Submit
                  </button>
                  <button>Delete Account</button>
                </div>
              </div>
            ) : null}
          </div>
        </Paper>
        <div className="main-container">
          <form onSubmit={(e) => this.props.handleSubmit(e)}>
            <SearchBar
              userInput={userInput}
              listOfUsers={listOfUsers}
              onSearchChange={onSearchChange}
            />
          </form>
          <div className="main">
            <h1>
              Hello{" "}
              {this.props.currentUser && this.props.currentUser.first_name}
            </h1>
            <p>
              It is currently
              {this.state.weather}
              in
              <p className="city">
                {this.props.currentUser && this.props.currentUser.location}
              </p>
            </p>
          </div>
          <Paper className="notifications">
            <h1>Here are your latest updates:</h1>
            <p>{""} new messages today</p>
            <p>{""} have birthday's this week</p>
            <p>Happy hour is this thursday at {""}</p>
          </Paper>
          <Paper className="groups">
            <div className="teams">
              <h1 className="teams-title">Teams </h1>

              {this.state.createButton ? (
                <button
                  className="create-team-button"
                  onClick={(e) =>
                    this.setState({
                      createButton: false,
                    })
                  }
                >
                  {" "}
                  -{" "}
                </button>
              ) : (
                <button
                  className="create-team-button"
                  onClick={(e) =>
                    this.setState({
                      createButton: true,
                    })
                  }
                >
                  {" "}
                  +{" "}
                </button>
              )}

              {this.state.createButton ? (
                <form>
                  <input
                    name="name"
                    onChange={this.nameHandleChange}
                    placeholder="Create Team"
                  />
                  <button
                    onClick={(e) =>
                      this.props.addTeam(
                        this.state.name,
                        this.props.currentUser && this.props.currentUser.id
                      )
                    }
                  >
                    Create Team
                  </button>
                </form>
              ) : null}
            </div>

            <ToggleCaret
              teams={this.props.teams}
              user={this.props.currentUser}
            />
          </Paper>
        </div>
      </div>
    );
  }
}
