import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ReplyToDM from './reply-to-DM';
import axios from 'axios';
import checkLogin from '../utils/checkLogin'
import sleep from '../utils/refresh';

export default class DMPanelBox extends Component {

  constructor(props) {
    super(props);
    this.state = { DMid : undefined};
    this.blockUser=this.blockUser.bind(this);
  }

  blockUser(){
    {this.setState({DMid:this.props.message._id})}
    let token = checkLogin();
    axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
        .then(res => {
            const userID = res.data._id
            axios.post('https://my-food-saver.herokuapp.com/api/blockedUsers/block_user',{
              ID: userID,
              DMid: this.state.DMid,
            })
            console.log('block user req sent')
        });
        // sleep(200)
        // setTimeout(function(){
        //   window.location.reload(); //refresh page
        // });
  }


  render() {

    const message = this.props.message;
    console.log('message:', message);
    
    console.log('message ID:', message._id)
    return (     
          <div class="col-6 bg-light rounded">
            <div class="card-body">
                <h5 class="card-title"style={{fontWeight: 'bold'}} > From: {message.directMessage.username} sent at: {message.directMessage.entryDate} </h5>
                <p style={{fontWeight: 'bold'}}>Message: {message.directMessage.message}</p>
                
           
                <div>
                <div> <ReplyToDM message={message}/> </div>
                  
                <br></br>
                <button class="mx-3 btn btn-danger btn-sm float-right" type="submit" onClick={this.blockUser} >Block User  </button>
            </div>
            </div>
            </div>
    );
  }
  
}
