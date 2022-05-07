import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery'
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

export default class senddm extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.postID)
        this.state = {postID: this.props.postID,
                    message: "",
                    entryDate: getDateTime() 
                    };
        this.submit = this.submit.bind(this);            
        this.handleMessageChange = this.handleMessageChange.bind(this);
        console.log('sendDM constructor')
    }
    

    handleMessageChange(event) {
        this.setState({message: event.target.value});
    }
 
    submit(){
        console.log('snet DM')
        const postID = this.state.postID
        
        const message = this.state.message
        const entryDate = this.state.entryDate
        let token = checkLogin();
        axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
        .then(res => {
            const userID = res.data._id
            const username = res.data.name
            axios.post("https://my-food-saver.herokuapp.com/api/directMessage/send_DM", {
                
                ID: userID,
                postID: postID,
                message: message,
                username: username,
                entryDate: entryDate

            }); 
            
        }); $('#alert-placeholder-sendDM').html("<div class='alert alert-success' role='alert'>"
        + "DM sent!</div>");
    }

    
  render() {

    return (
        <div class="container-fluid">
          

          <form>
            <div class="form-group">
              <div id="alert-placeholder-sendDM"/>
              <label htmlFor="exampleFormControlTextarea1">Private DM:</label>
              
              <input class="form-control" id="inputName" placeholder="(e.g. Hey saw your post...)"
              value={this.state.message} onChange={this.handleMessageChange.bind(this)}/>
            </div>
          </form>
          <button onClick={this.submit} class="mx-3 btn btn-success float-right">Send DM</button>
          <br />
        </ div>
      ); 
  }
}