import React, { Component } from 'react';
import axios from 'axios';
import {twoWordMax, inputFormat, checkAt} from "../utils/validation";
import $ from 'jquery';

export default class signup extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

   
      if(checkAt(this.state.email)){
        if(inputFormat(this.state.password)){
          const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            calorieLimit: 2500
          };
      
          axios.post('https://my-food-saver.herokuapp.com/api/signup/add', user)
            .then(res => console.log(res.data));

          $('#alert-placeholder').html("<div class='alert alert-success' role='alert'>"
          + "Sign up successful!</div>");
        }else{
          $('#alert-placeholder').html("<div class='alert alert-danger' role='alert'>"
          + "Password must contain atleast 1 capital letter & 3 numbers!</div>");
        }
      }else{
        $('#alert-placeholder').html("<div class='alert alert-danger' role='alert'>"
        + "Email format incorrect, use format ____@____.____!</div>");
      }
  }

  render() {
    return (
    <div class="bg-secondary px-4 py-4 rounded">
      <h3>Making us <strong>your food manager.</strong></h3>

      <br/>

      <form onSubmit={this.onSubmit}>
      <div className="form-group"> 
          <label>Username: </label>
          <input  type="text" 
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
        </div>
        <div className="form-group"> 
          <label>Email: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input 
              type="password" 
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              />
        </div>

        <br/>

        <div className="form-group">
          <input type="submit" value="Sign up" className="btn btn-dark btn-block" />
        </div>
      </form>

      <div id='alert-placeholder'/>

    </div>
    )
  }
}