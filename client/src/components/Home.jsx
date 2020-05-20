import React, { Component } from 'react'
import Search from './Search'
import GeoLocation from './GeoLocation'
import {WEATHER_API_KEY} from '../config'

export default class Home extends Component {
  render() {
    return (
          <div class="home">
            <div class="sidebar">
              <h1>Sidebar</h1>
              <p>Direct Messages</p>
              <button class="logout" onClick={this.props.handleLogout}>Logout</button>
              <button>Settings</button>
        </div>
        <div class="main-container">
        <Search class="search" />
            <div class="main">
              
              <h1>Hello {this.props.currentUser
                &&
                this.props.currentUser.first_name}</h1>
              <p>It is currently in Sydney, Australia</p>
            </div>
        </div>
        </div>
    )
  }
}
