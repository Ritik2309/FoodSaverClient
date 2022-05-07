import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery'

export default class UnblockUser extends Component {
    
  
  
  render() {
      console.log(this.props)
      this.state={
         data: this.props.data,
         ID: this.props.userID
        
      }
      let username = this.state.data.username
      let dataID = this.props.data._id
      let userID = this.props.userID

    return (
        <div class="container-fluid">
            <div role="alert">
            <p >Blocked User: <p class="card-title" style={{fontWeight: 'bold'}}>{username}</p></p>
             <button onClick={ ()=>{axios.post("https://my-food-saver.herokuapp.com/api/blockedUsers/unblockUser", {ID:userID, blockedUserObjectID:  dataID})
                 $('#alert-placeholder').html("<div class='alert alert-success' role='success'>"
                    + "User unblocked!");}}  class="mx-3 btn btn-danger float-right">Unblock User</button>
            </div>
        </ div>
      ); 
  }

 
}