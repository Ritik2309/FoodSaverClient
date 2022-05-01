import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


export default class DMPanelBox extends Component {
  render() {

    const message = this.props.message;

    return (     
        
            <div class="card-body">
                <h5 class="card-title"style={{fontWeight: 'bold'}} > From: {message.directMessage.username} sent at: {message.directMessage.entryDate} </h5>
                <p style={{fontWeight: 'bold'}}>Message: {message.directMessage.message}</p>
                <br></br>
            </div>
        
    );
  }
  
}
