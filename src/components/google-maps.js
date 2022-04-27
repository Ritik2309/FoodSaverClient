import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Map, InfoWindow, Marker , GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    return (
        <Map google={this.props.google} zoom= {10} initialCenter ={{lat:43.071754,lng:-70.762550}}>
            <Marker onClick={this.onMarkerClick} name={'Portsmouth'}/>
            <InfoWindow on CLose={this.onInfoWindowClosr}>
            <div>
                
            </div>
            </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyComBmJ8e0gvK84jLDBkfAkczHqQXivuRA"
})(MapContainer)