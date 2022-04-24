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

export default class RemoveItem extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      itemName: this.props.itemName,
      UserID: ""
    };

    this.submit = this.submit.bind(this);
    
  }


  submit(){
            let token = checkLogin();
            axios.post('http://localhost:5000/api/getUser/getUserData',{token: token})
              .then(res =>{
                this.setState({UserID: res.data._id})
                axios.post("http://localhost:5000/api/shopping/remove_item", {
                itemToRemove: this.state.itemName,
                ID: this.state.UserID
              
                });
                
              })
            
            sleep(200)
            setTimeout(function(){
              window.location.reload(); //refresh page
            });
        }
    

  render() {
    
      return (
        <div class="container-fluid">
          <div id="alert-placeholder"/>
          <button onClick={this.submit} class="mx-3 btn btn-secondary float-right">Remove Item</button>
          <br />
        </ div>
      ); 
    
    
  }
}