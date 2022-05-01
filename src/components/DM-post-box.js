import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


export default class DMPanelBox extends Component {
  render() {

    const message = this.props.message;


    return (     
        
            <div class="card-body">
                <h5 class="card-title"> {message.username} {message.entryDate} </h5>
                <p >Message: {message.message}</p>
                <br></br>
                
            </div>
        
    );
  }
  
}
