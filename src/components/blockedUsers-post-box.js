import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import checkLogin from '../utils/checkLogin';


export default class blockedUsersPostBox extends Component {
        constructor(props) {
            super(props);
            this.state={blockedUsersList: undefined}
            this.submit = this.submit.bind(this);
        }
        componentDidMount(){
          axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
            .then(res => {
                const userID = res.data._id
                axios.post("https://my-food-saver.herokuapp.com/api/blockedUsers/load_blockedusers", {ID: userID})
                  .then(res=>{
                    this.setState({blockedUsersList: res.data, blockedUserID: undefined})
                  })
            })        
        }
        

        submit(){
            const blockedUserID = this.state.blockedUserID
            
            let token = checkLogin();
            axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
            .then(res => {
                const userID = res.data._id
                axios.post("https://my-food-saver.herokuapp.com/api/blockedUsers/unblockUser", {ID:userID,blockedUserObjectID: blockedUserID});
            });
        }

        
      render() {
        let blockedUsersList = this.state.blockedUsersList
        return (
          <>
          {blockedUsersList.blockedUsers.map((data, index) => {
              if (data) {
                {this.setState({blockedUserID: data._id})}
                return (
                  <>
                  <div key={data} class="list-group">
                  <li class="list-group-item">
                  <p >Blocked User: <p class="card-title" style={{fontWeight: 'bold'}}>{data.username}</p></p>                      
                  <button onClick={this.submit}  class="mx-3 btn btn-danger float-right">Unblock User </button>
                  </li>
                    
                  </div>
                  <br />
                  <br />
                  </>
                )	
              }
              return null
          }) }
          </>
    );
  
  }
}