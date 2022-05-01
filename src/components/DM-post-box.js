import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ReplyToDM from './reply-to-DM';
import axios from 'axios';
import checkLogin from '../utils/checkLogin'
import sleep from '../utils/refresh';

export default class DMPanelBox extends Component {

  blockUser(){
    let token = checkLogin();
    axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
        .then(res => {
            const userID = res.data._id
            axios.post('https://my-food-saver.herokuapp.com/api/blockedUsers/block_user',{
              userID: userID,
              DMid: this.props.message._id,
              

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
    console.log('message ID:', message._id)
    return (     
          <div class="col-6 bg-light rounded">
            <div class="card-body">
                <h5 class="card-title"style={{fontWeight: 'bold'}} > From: {message.directMessage.username} sent at: {message.directMessage.entryDate} </h5>
                <p style={{fontWeight: 'bold'}}>Message: {message.directMessage.message}</p>
                
                <div class="modal fade" id="send-DM" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h3 class="modal-title" id="modalTitle">Send DM</h3>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                      <ReplyToDM message={message}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div> 
                  <button class="mx-3 btn btn-success btn-sm"  data-toggle="modal" data-target="#send-DM">
                    Reply
                  </button>
                <br></br>
                <button class="mx-3 btn btn-danger btn-sm float-right" type="submit" onClick={this.blockUser(this)}>Block User</button>
            </div>
            </div>
            </div>
    );
  }
  
}
