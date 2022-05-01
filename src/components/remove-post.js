import React, { Component } from 'react';
import axios from "axios";
import $, { post } from 'jquery';
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

export default class RemovePost extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      post: this.props.post,
      UserID: undefined
    };

    this.submit = this.submit.bind(this);
    let token = checkLogin();
            axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
              .then(res =>{
                this.setState({UserID: res.data._id})
                
              })
  }


  submit(){
            axios.post("https://my-food-saver.herokuapp.com/api/Social_posts/remove_post", {
              ID: this.state.post._id
            });
            sleep(100)
            setTimeout(function(){
              window.location.reload(); //refresh page
            });
        }
    

  render() {
    if(this.state.post.socialPost.userID){
      return (
        <div class="container-fluid">
          <div id="alert-placeholder"/>
          <button onClick={this.submit} class="mx-3 btn btn-danger float-right">Remove Post</button>
          <br />
        </ div>
      ); 
    }
    else{
      return null;
    }
    
  }
}