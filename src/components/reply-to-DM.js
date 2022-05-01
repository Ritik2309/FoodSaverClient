import React, { Component } from 'react';
import axios from "axios";
import $ from 'jquery';
import {integerCheck, tfTimeCheck} from "../utils/validation";
import checkLogin from '../utils/checkLogin'

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

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

export default class ReplyToDM extends Component {
  constructor(props) {
    super(props);
    const message = this.props.message;
    console.log(message)
        this.state = {DMid: message._id,
                    username: undefined,
                    message: "example message",
                    entryDate: getDateTime() 
                    };

        this.submit = this.submit.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
}

  submit(){
            const DMid = this.state.DMid
            console.log('DM ID: ', DMid )
            const message = this.state.message
            const entryDate = this.state.entryDate

            let token = checkLogin();
            axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
            .then(res => {
                console.log(res.data)
                const userID = res.data._id
                const username = res.data.name
                axios.post("https://my-food-saver.herokuapp.com/api/directMessage/reply_DM", {
                
                fromID: userID,
                DMid: DMid,
                message: message,
                username: username,
                entryDate: entryDate

                });
            });
            $('#alert-placeholder').html("<div class='alert alert-success' role='success'>"
                    + "DM sent!");
        }
    

  render() {

    return (
          <div class="container-fluid">
          <div id="alert-placeholder"/>

          <form>
            <div class="form-group">
                
              <label htmlFor="exampleFormControlTextarea1">Enter message:</label>
              <input class="form-control" id="inputName" placeholder="(e.g. yes that sounds good!)" 
              value={this.state.message} onChange={this.handleMessageChange.bind(this)}/>
            </div>
          </form>
          <button onClick={this.submit()} class="mx-3 btn btn-success float-right">Send DM</button>
          <br />
        </ div>
      ); 
  }
}