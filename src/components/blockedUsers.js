import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {integerCheck, tfTimeCheck} from "../utils/validation";
import axios from 'axios';
import checkLogin from '../utils/checkLogin';


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

export default class blockedUsers extends Component {
    constructor(props) {
        super(props);
        
    
    }
    

    submit(){
        const postID = this.state.postID
        const message = this.state.message
        const username = this.state.username
        const entryDate = this.state.entryDate
        let token = checkLogin();
        axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
        .then(res => {
            const userID = res.data._id
            axios.post("https://my-food-saver.herokuapp.com/api/directMessage/send_DM", {
            
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
        <div class="container-fluid">
          <div id="alert-placeholder"/>

          <form>
            <div class="form-group">
                
              <label htmlFor="exampleFormControlTextarea1">Blocked Users:</label>
              <input class="form-control" id="inputName" placeholder="(e.g. Breaded Chicken Steak)" 
              value={this.state.message} onChange={this.handleMessageChange.bind(this)}/>
            </div>
          </form>
          <button onClick={this.submit} class="mx-3 btn btn-success float-right">Send DM</button>
          <br />
        </ div>
      ); 
  }
}