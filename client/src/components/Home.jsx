import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <div class="home">
        <div class="sidebar">
          <img src={''} />
          <h1>My Dashboard</h1>
          <p>Direct Messages</p>
          <ul>
            <li>Tim</li>
            <li>Jim</li>
            <li>Bean</li>
          </ul>
          <p>Groups</p>
          <ul>
            <li>The Power</li>
            <li>The Pups</li>
          </ul>
          <div class="button-container">
          <button class="logout" onClick={this.props.handleLogout}>Logout</button>
            <button class="button">Settings</button>
            </div>
        </div>
        <div class="main-container">
        <form
      onSubmit={
        e => this.props.handleSubmit(e)
      }>
      <input
        class="search"
        value={this.props.search}
        onChange={e => this.props.handleChange(e)}
        name='search'
        type="text"
        placeholder='Search Datadog employees'
      />
      <button type="submit">Search</button>
    </form>
          <div class="main">

            <h1>Hello {this.props.currentUser
              &&
              this.props.currentUser.first_name}</h1>
            <p>It is currently in Sydney, Australia</p>
          </div>
          <div class="notifications">
            <h1>You have 36 updates</h1>
          </div>
          <div class="groups">
            <h1>3 teams</h1>
          </div>
        </div>
      </div>
    )
  }
}
