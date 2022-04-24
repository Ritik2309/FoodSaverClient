import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default class Success extends Component {
  render() {

    const message = this.props.message;

    return (
        <div class="container-fluid">
            <div class="alert alert-success" role="alert">
                {message}
            </div>
        </ div>
      ); 
  }
}