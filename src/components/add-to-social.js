import React, { Component } from 'react';
import axios from "axios";
import styles from "./styling.module.css"
import checkLogin from '../utils/checkLogin'
import RecipeImageBar from "./recipe-image-bar";
import sleep from '../utils/refresh';
import {getImage, getLocation} from '../utils/storage';
import { Link } from 'react-router-dom';


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

export default class AddToSocial extends Component {
  constructor(props) {
    super(props);
    
      this.state = {
        userID: "", 
        newEntryDate: getDateTime(), 
        newMessage: "", 
        imageLink: this.props.image,
        location: this.props.location
      };
    
    this.submit = this.submit.bind(this);
    
  }

  handlenewMessage(event) {
    this.setState({newMessage: event.target.value});
  }


  
  submit(){
   
            let token = checkLogin();
            
            axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
              .then(res => {
                  const userID = res.data._id
                  const username = res.data.name;
                  axios.post("https://my-food-saver.herokuapp.com/api/Social_posts/add_post", {
                    userID: userID,
                    username:username,
                    newEntryDate:getDateTime().toString(),
                    newMessage: this.state.newMessage,
                    imageLink: this.state.imageLink,
                    location: this.state.location,
                    replies: []
                  });
            });
            sleep(100);
            setTimeout(function(){
              window.location.reload(); //refresh page
            });
          
        }
    
        selectImage(){

        }
        handleButtonClicked() {
        }

  render() {

    return (
        <div class="container-fluid">
          <div id="alert-placeholder"/>

          <form>
            <div class="form-group">
            <div><label htmlFor="exampleFormControlTextarea1">Search for food images to add to post: <RecipeImageBar /><br /> </label><label htmlFor="exampleFormControlTextarea1"> <br /> Currently selected image: <img class="float-right" className={styles.recipePreviewSize} src={this.state.imageLink}></img></label><div>
            
            </div></div>
            <label htmlFor="exampleFormControlTextarea1">currently selected location: {this.state.location} <Link to={{
                pathname: "/maps"
            }}>
            <button onClick={this.handleButtonClicked.bind(this)} class="float-right" type="submit">Select Location</button>
            </Link></label>
            <br />
            <br />
            
              <label htmlFor="exampleFormControlTextarea1">Then enter a message to post:</label>
              
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={this.setState.newMessage}  onChange={this.handlenewMessage.bind(this)}  >
              </textarea>
             
            </div>
          </form>
          <button onClick={this.submit} class="mx-3 btn btn-primary float-right">Post Message</button>
          <br />
        </ div>
      ); 
  }
}