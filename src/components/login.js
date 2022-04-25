import React, { Component } from "react";
import {setInStorage} from '../utils/storage';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            email:'',
            password:'',
            buttonText: this.props.buttonText
        };
    }

    onChangeEmail(e) {
      this.setState({
        email: e.target.value
      });
    }
    onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
    }
 
    onSubmit(e) {// Grab state
        e.preventDefault();
        const userData = {
          email: this.state.email,
          password: this.state.password,
        };// Post request to backend
        
        axios.post('https://my-food-saver.herokuapp.com/api/login/', userData)
         .then(res => {
          if (res) {
            setInStorage("x-auth-token", res.data);
            
             this.setState({
               password: "logged in",
               email: "logged in"
              });

            setTimeout(function(){
              window.location.reload(); //to refresh page
            });
            }
            else{
             this.setState({
               password: "",
               email: ""
               });
              
           }
        })
        
    }

      render() {
        return (
        <>
          <button type="button" class="mx-1 btn btn-secondary float-right" data-toggle="modal" data-target="#loginModal">
            {this.state.buttonText}
          </button>


          <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content bg-secondary">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div class="modal-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group1"> 
                      <label>Email: </label>
                      <input type="email"
                          required
                          className="form-control"
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                        />
                    </div>

                    <br/>
                    <br/>

                    <div className="form-group2"> 
                      <label>Password: </label>
                      <input  type="password"
                        required
                        className="form-control"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        />
                </div>

                <br/>
                <br/>

                <div className="form-group">
                  <input type="submit" value="Login" className="btn btn-dark btn-block" />
                </div>

                </form>
              </div>

            </div>
          </div>
        </div>
        </>
        )
      }
}