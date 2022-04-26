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

export default class ReplyToPost extends Component {
  constructor(props) {
    super(props);
    const post = this.props.reply;
    this.state = {
      postID: post._id,
      reply: {
        username: post.socialPost.username,
        entryDate: getDateTime(),
        replyMessage: ""
      }
    };

    this.submit = this.submit.bind(this);
    
  }


  handlenewMessage(event) {
    this.setState({replyMessage: event.target.value});
  }


  submit(){
   
            let token = checkLogin();

            axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
              .then(res => {
                  
                  const username = res.data.name;
                  axios.post("https://my-food-saver.herokuapp.com/api/Social_posts/add_reply", {
                    
                    postID: this.state.postID,
                    reply: {
                    username:username,
                    entryDate: getDateTime().toString(),
                    replyMessage: this.state.replyMessage
                    }
                  }) .then(res => {console.log(res)});
            });
            sleep(100)
            setTimeout(function(){
              window.location.reload(); //refresh page
            });
        }
    

  render() {

    return (
        <div class="container-fluid">
          <div id="alert-placeholder"/>

          <form>
            <div class="form-group">
              <label htmlFor="exampleFormControlTextarea1">Enter message to reply with:</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={this.setState.replyMessage}  onChange={this.handlenewMessage.bind(this)}>
              </textarea>
            </div>
          </form>
          <button onClick={this.submit} class="mx-3 btn btn-success float-right">Reply</button>
          <br />
        </ div>
      ); 
  }
}