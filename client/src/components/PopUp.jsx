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
    return (
      <div class="modal">
        <div class="modal-content">
          <span class="close" onClick={this.handleCick}>
            &times;
          </span>
          <form onClick={this.props.addUser}>
            <label>
              Add User:
              <input type="text" name="name" />
            </label>
            <br />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}
