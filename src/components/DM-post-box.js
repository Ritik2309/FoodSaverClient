import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ReplyToDM from './reply-to-DM';
import axios from 'axios';
import checkLogin from '../utils/checkLogin'

export default class DMPanelBox extends Component {



  constructor(props) {
    super(props);
    this.state = { message: this.props.message, DMid :  this.props.message._id, userID: this.props.message.toID};
    this.blockUser=this.blockUser.bind(this);
  }

  async blockUser(){
    console.log(this.state.userID)
    console.log(this.state.DMid)
    await axios.post('https://my-food-saver.herokuapp.com/api/blockedUsers/block_user',{
              ID: this.state.userID,
              DMid:this.state.DMid,
             })
          // .then(()=>{
          // setTimeout(function(){
          //        window.location.reload(1); //refresh page
          //      });
          // });
        
  }


  render() {

    let message = this.state.message;
    console.log('message:', this.state.DMid);
    
    
    return (
          <div class="col-6 bg-light rounded">
            <div class="card-body">
                <h5 class="card-title"style={{fontWeight: 'bold'}} > From: {message.directMessage.username} <br/> Date sent: {message.directMessage.entryDate} </h5>
                <br/>
                <p style={{fontWeight: 'bold'}}>Message: {message.directMessage.message}</p>
                <div>
                <div> <ReplyToDM message={message}/> </div>
                <br/>
                <button class="mx-3 btn btn-danger btn-sm float-right" type="submit" onClick={this.blockUser}  >Block User </button>
            </div>
            </div>
            </div>
    );
  }
  
}
