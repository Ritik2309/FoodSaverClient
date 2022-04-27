import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Map, InfoWindow, Marker , GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    return (
        <Map google={this.props.google} zoom= {10}>
            <Marker onClick={this.onMarkerClick} name={'Current Location'}/>
            <InfoWindow on CLose={this.onInfoWindowClosr}>
            <div>
                <h1>{this.state.selectedPlace.name}</h1>
            </div>
            </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyComBmJ8e0gvK84jLDBkfAkczHqQXivuRA"
})(MapContainer)