import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import Success from "./success";
import $ from 'jquery';
import {integerCheck} from "../utils/validation";
import checkLogin from "../utils/checkLogin";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: false
                , userID: undefined
                , userDeleted: false
                , userDataDeleted: false
                , limitChanged: false
                , kcalInput: ""
              };
    
    this.setCalorieLimit = this.setCalorieLimit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.deleteUserData = this.deleteUserData.bind(this);
  }

  async componentDidMount() {
    let token = checkLogin();
    if (!(token == null)) {await axios.post('http://localhost:5000/api/getUser/getUserData',{token: token})
        .then(res => {
            this.setState({userID: res.data._id});
        });

    await this.setState({ loggedIn: true });
    }

  }

 async deleteUserData(){
    await axios.post('http://localhost:5000/api/getUser/delete_user_data',{ID: this.state.userID})
    .then(this.setState({userDataDeleted: true}));
 }

 async deleteUser(){
    await axios.post('http://localhost:5000/api/getUser/delete_user',{ID: this.state.userID})
    .then(this.setState({userDeleted: true}));
 }

 async setCalorieLimit() {
   if(integerCheck(this.state.kcalInput)){
      await axios.post('http://localhost:5000/api/getUser/change_limit',{ID: this.state.userID, limit: parseInt(this.state.kcalInput)})
      .then(this.setState({limitChanged: true}));
   }else{
    $('#valid-calories').html("<div class='alert alert-warning' role='alert'>"
    + "Calories must be an integer!</div>");
   }
 }

  render() {
    $('#kcal-limit-modal').find('#mutableInput').on('input', 
    () => {this.setState.kcalInput = $('#kcal-limit-modal').find('#mutableInput').val();});

    return (
        <div class="container-fluid">
          
          <h3>Settings</h3>
          <p class="text-muted float-left">A few tools which may come in handy.</p>

          <br/>
          <br/>
          <br/>
          <br/>

          <div class="row">

            <div class="col-6 bg-secondary rounded">
              <br/>
              <h4 class="d-flex justify-content-center">Account settings</h4>
              <br/>
              <button onClick={this.deleteUserData} type="button" class="btn btn-dark btn-block">Delete all user data</button>
              <br/>
              <button onClick={this.deleteUser} type="button" class="btn btn-dark btn-block">Delete account from our system</button>
              {(this.state.userDeleted) &&
              <Redirect to={"/logout"}/>
              }
              <br/>
            </div>

            <div class="col-6 bg-success rounded">
              <br/>
              <h4 class="d-flex justify-content-center">Diet settings</h4>
              <br/>
              <button type="button" class="btn btn-dark btn-block" data-toggle="modal" data-target="#kcal-limit-modal" >Set daily kcal limit</button>

                <div class="modal fade" id="kcal-limit-modal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                      <div class="modal-content bg-secondary">
                          <div class="modal-header">
                              <h3 class="modal-title" id="modalTitle">Set daily limit</h3>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <div class="modal-body" id="modalBody">

                              <div id='valid-calories'/>

                              <p>New limit (in kcal):</p>
                              
                              <form>
                                  <div class="form-group">
                                      <h5 class="inputHeader" for="addToInput"/>
                                      <input class="form-control" id="mutableInput"/>
                                  </div> 
                              </form>

                              <button onClick={this.setCalorieLimit} id="submitButton" type="Submit" class="btn btn-dark btn-block">Submit</button>
                          </div>
                      </div>
                  </div>
              </div>

              <br/>
              <button type="button" class="btn btn-dark btn-block" disabled>Change date format - coming soon!</button>
              <br/>
            </div>

          </div>

          <br />

          {(this.state.userDataDeleted) &&
            <Success message={"All fridge and tracker data successfully deleted..."} />
          }

          {(this.state.limitChanged) &&   
            <Success message={"Calorie limit successfully set..."}>{$('#kcal-limit-modal').modal('toggle')}</Success>
          }
        
        </div>
    );
  }
}