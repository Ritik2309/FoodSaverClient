import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ReplyToDM from './reply-to-DM';

export default class DMPanelBox extends Component {
  render() {

    const message = this.props.message;

    return (     
        
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
            </div>
            </div>
        
    );
  }
  
}
