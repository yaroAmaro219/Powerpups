import React, { Component } from "react";

export default class PopUp extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  handleClick = () => {
    this.props.toggle();
  };

  render() {
    const { userInput, listOfUsers, onSearchChange } = this.props;
    return (
      <div class="modal">
        <div class="modal-content">
          <span class="close" onClick={this.handleCick}>
            &times;
          </span>
          <form onClick={this.props.addUser}>
            <label>
              Add User:
              </label>
              <input type="text" name="name" />
              
         
      
            <br />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}
