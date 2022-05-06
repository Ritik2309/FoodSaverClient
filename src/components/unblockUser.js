import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

export default class UnblockUser extends Component {
    async unblock(){
      await axios.post("https://my-food-saver.herokuapp.com/api/blockedUsers/unblockUser", {ID:this.props.ID,blockedUserObjectID: this.props.data._id});          
     }
  
  
  render() {

    const data = this.props.data;
    console.log(data)
    const ID = this.props.ID

    return (
        <div class="container-fluid">
            <div role="alert">
            <p >Blocked User: <p class="card-title" style={{fontWeight: 'bold'}}>{data.username}</p></p>                      
             <button onClick={this.unblock}  class="mx-3 btn btn-danger float-right">Unblock User</button>
            </div>
        </ div>
      ); 
  }
}