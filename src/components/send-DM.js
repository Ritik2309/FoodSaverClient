import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {integerCheck, tfTimeCheck} from "../utils/validation";
import axios from 'axios';
import checkLogin from '../utils/checkLogin';
import { post } from 'jquery';

function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
     
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
     
    var dateTime = year+'/'+month+'/'+day+' Time: '+hour+':'+minute;   
     return dateTime;
}


export default class AddToButton extends Component {
    constructor(props) {
        super(props);

        this.state = {postID: this.props.postID,
                    toUserName: this.props.username,
                    message: undefined,
                    entryDate: getDateTime() 
                    };

        this.submit = this.submit.bind(this);
        this.updateModal = this.updateModal.bind(this);
    }

    componentDidMount() {
        let token = checkLogin();
    
        if (!(token == null)) {
          this.setState({ loggedIn: true });
        }
    }



    handleUserInputChange(event) {
        this.setState({userInput: event.target.value});
    }

    updateModal() {
        var modal = this.state.context.find('#sendDM');
        modal.find('.modal-title').text("Send DM");

        modal.find('.toUserName').text(this.state.username);
        

        modal.find('#mutableInput').on('input', 
        () => {this.setState.userInput = modal.find('#mutableInput').val();});

        modal.find('#submitButton').on("click", this.submit);
        
    }

    //validation needed
    submit(){
        const postID = this.state.postID
        const message = this.state.message
        const username = this.state.username
        const userID = undefined
        const entryDate = this.state.entryDate
        let token = checkLogin();
        axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
        .then(res => {
            userID = res.data._id
            axios.post("https://my-food-saver.herokuapp.com/api/directMessage/add_DM", {
            
            fromID: userID,
            postID: postID,
            message: message,
            username: username,
            entryDate: entryDate

            });
        });
    }


    render() {
        return (
        <>
            {(this.state.loggedIn) &&
            <>
                <button onClick={this.submit} class="my-2 mx-2 btn btn-dark float-right" type="button" data-toggle="modal" data-target="#addToButtonModal">
                Send DM
                </button>
            </>
            }
            <div class="modal fade" id="sendDM" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="modalTitle"></h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" id="modalBody">
                            <div id="alert-placeholder2" />

                            <br/>

                            <h5>Direct Message To:</h5>
                            <div class="toUserName"/>
                            <form>
                                <div class="form-group">
                                    <h5 class="inputHeader" for="addToInput"/>
                                    <input class="form-control" id="mutableInput" onChange={this.handleUserInputChange.bind(this)}/>
                                </div> 
                            </form>

                            <button id="submitButton" class="mx-3 btn btn-secondary float-right">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}