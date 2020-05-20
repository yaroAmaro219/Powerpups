import React, { Component } from 'react'
import { GOOGLE_API_KEY } from '../config'
import {WEATHER_API_KEY} from '../config'

export default class GeoLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCordinates = this.getCordinates.bind(this);
    this.getUserAddress = this.getUserAddress.bind(this);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCordinates, this.handleLocationError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getCordinates(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }

  getUserAddress = async () => {
    await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=false&key=${GOOGLE_API_KEY}`)
  }

  handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location times out")
        break;
    }
  }
  render() {
    return (
      <div>
        <h4>GeoLocation</h4>
        <button id="submit" onClick={this.getLocation}>Get Cordinates</button>
        {
          this.state.latitude && this.state.longitude ?
            <img class="geo-img" src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x400&markers=color:red%7C${this.state.latitude},${this.state.longitude}&key=${GOOGLE_API_KEY}`} alt='yoda' />
            :
            null
        }
        {
            this.state.latitude && this.state.longitude ?
            <div>{`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${WEATHER_API_KEY}`}</div>
            :
            null
        }
      </div>
    )
  }
}