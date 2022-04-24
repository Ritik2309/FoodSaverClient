import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default class Alert extends Component {
  render() {

    const message = this.props.message;

    return (
        <div class="container-fluid">
            <div class="alert alert-warning" role="alert">
                {message}
            </div>
        </ div>
      ); 
  }
}