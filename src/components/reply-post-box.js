import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styling.module.css"
import RemovePost from './remove-post';

export default class ReplyPanelBox extends Component {
  render() {

    const reply = this.props.reply;


    return (     
        
            <div class="card-body">
                <h5 class="card-title"> {reply.username} {reply.entryDate} </h5>
                <p >Reply Message: {reply.replyMessage}</p>
                <br></br>
                
            </div>
        
    );
  }
  
}
