import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import Success from "./success";
import $ from 'jquery';
import {integerCheck} from "../utils/validation";
import checkLogin from "../utils/checkLogin";
import BlockedUsersPostBox from "./blockedUsers-post-box"



export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: false
                , userID: ""
                , userDeleted: false
                , userDataDeleted: false
                , limitChanged: false
                , kcalInput: ""
                , blockedUsersList: undefined,
                blockedUserID: []
              };
    
    this.setCalorieLimit = this.setCalorieLimit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.deleteUserData = this.deleteUserData.bind(this);
    this.unblock = this.unblock.bind(this)
    this.getBlockedList = this.getBlockedList.bind(this)
 
}

  async componentDidMount() {
    let token = checkLogin();
    if (!(token == null)) { 
      await axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
        .then(res => {
            this.setState({userID: res.data._id});
            console.log( res.data._id)
            console.log('set userID')
            const userID = res.data._id
             axios.post("https://my-food-saver.herokuapp.com/api/blockedUsers/load_blockedusers", {ID:userID})
              .then(blockedUsersRes=>{
                console.log(blockedUsersRes.data[0])
                console.log(blockedUsersRes)
                console.log('got blocked users')
                this.setState({blockedUsersList: blockedUsersRes.data[0].blockedUsers})
              })
            
        });
        await this.setState({ loggedIn: true });
    }


  }
  async getBlockedList(){
    let token = checkLogin();
     axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
        .then(res => {
          console.log('id:', res.data._id)
          axios.post("https://my-food-saver.herokuapp.com/api/blockedUsers/load_blockedusers", {ID:res.data._id})
            .then(blockedUsersRes=>{
            console.log(blockedUsersRes.data[0].blockedUsers)
            console.log('got blocked users')
            this.setState({blockedUsersList: blockedUsersRes.data[0].blockedUsers})
          });  
        });
   }


  async unblock(blockedUserID){
    await axios.post("https://my-food-saver.herokuapp.com/api/blockedUsers/unblockUser", {ID:this.state.userID,blockedUserObjectID: blockedUserID});          
   }

 async deleteUserData(){
    await axios.post('https://my-food-saver.herokuapp.com/api/getUser/delete_user_data',{ID: this.state.userID})
    .then(this.setState({userDataDeleted: true}));
 }

 async deleteUser(){
    await axios.post('https://my-food-saver.herokuapp.com/api/getUser/delete_user',{ID: this.state.userID})
    .then(this.setState({userDeleted: true}));
 }

 async setCalorieLimit() {
   if(integerCheck(this.state.kcalInput)){
      await axios.post('https://my-food-saver.herokuapp.com/api/getUser/change_limit',{ID: this.state.userID, limit: parseInt(this.state.kcalInput)})
      .then(this.setState({limitChanged: true}));
   }else{
    $('#valid-calories').html("<div class='alert alert-warning' role='alert'>"
    + "Calories must be an integer!</div>");
   }
 }

  render() {
    $('#kcal-limit-modal').find('#mutableInput').on('input', 
    () => {this.setState.kcalInput = $('#kcal-limit-modal').find('#mutableInput').val();});
    console.log(this.state.userID)
    
    console.log('test')
    
    console.log( this.state.blockedUsersList)
    
    
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
              <button onClick={this.getBlockedList} type="button" class="btn btn-dark btn-block" data-toggle="modal" data-target="#blockedUsers-modal" >View blocked users</button>

                <div class="modal fade" id="blockedUsers-modal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                      <div class="modal-content bg-secondary">
                          <div class="modal-header">
                              <h3 class="modal-title" id="modalTitle">Blocked Users</h3>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <div class="modal-body" id="modalBody">
                          <div class="list-group">
                          <div id="alert-placeholder"/>
                          <>
                        
                          {this.state.blockedUsersList?.map((data, index) => {
                              if (data) {
                                return (
                                  <>
                                  
                                  <li class="list-group-item">
                                  <p >Blocked User: <p class="card-title" style={{fontWeight: 'bold'}}>{data.username}</p></p>                      
                                  <button onClick={this.unblock(data._id)}  class="mx-3 btn btn-danger float-right">Unblock User</button>
                                  </li>
                                    
                                  
                                  <br />
                                  <br />
                                  </>
                                )	
                              }
                              return null
                          }) }
                          </>
                        </div>
                          </div>
                      </div>
                  </div>
              <br/>
            </div>
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

          
            </div>

          

           <br />

           {(this.state.userDataDeleted) &&
             <Success message={"All fridge and tracker data successfully deleted..."} />
           }

           {(this.state.limitChanged) &&   
             <Success message={"Calorie limit successfully set..."}>{$('#kcal-limit-modal').modal('toggle')}</Success>
           }        
        </div>
      </div>
    )

    }
    
}