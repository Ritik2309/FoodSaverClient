import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import checkLogin from '../utils/checkLogin';
import $ from 'jquery'

export default class BlockedUsersPostBox extends Component {
        constructor(props) {
            super(props);
            this.state={blockedUsersList: undefined, blockedUserID: undefined}
            this.submit = this.submit.bind(this);
           // this.getBlockedUsers=this.getBlockedUsers(this);
        }
        // getBlockedUsers(){
        //     let token = checkLogin();
        //     axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
        //       .then(res => {
        //           const userID = res.data._id
        //           console.log(userID)
        //           axios.post("https://my-food-saver.herokuapp.com/api/blockedUsers/load_blockedusers", {ID: userID})
        //             .then(blockedUsersRes=>{
        //               console.log(blockedUsersRes.data)
        //               this.setState({blockedUsersList: blockedUsersRes.data})
        //             })
        //       })
        // }

        submit(blockedUserID){
            
            let token = checkLogin();
            axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
            .then(res => {
                const userID = res.data._id
                axios.post("https://my-food-saver.herokuapp.com/api/blockedUsers/unblockUser", {ID:userID,blockedUserObjectID: blockedUserID});
            });
        }

        
      render() {
       // this.getBlockedUsers
        let blockedUsersList = this.props.blockedUsersList
        console.log(blockedUsersList)
        
        return (
        <div class="list-group">
          <div id="alert-placeholder"/>
          <>
          {/* {blockedUsersList.map((data, index) => {
              if (data) {
                {this.setState({blockedUserID: data._id})}
                return (
                  <>
                  
                  <li class="list-group-item">
                  <p >Blocked User: <p class="card-title" style={{fontWeight: 'bold'}}>{data.username}</p></p>                      
                  <button onClick={this.submit(data._id)}  class="mx-3 btn btn-danger float-right">Unblock User</button>
                  </li>
                    
                  
                  <br />
                  <br />
                  </>
                )	
              }
              return null
          }) } */}
          </>
        </div>
    );
  
  }
}