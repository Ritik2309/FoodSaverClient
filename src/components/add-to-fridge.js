import React, { Component } from 'react';
import axios from "axios";
import $ from 'jquery'; 
import {integerCheck} from "../utils/validation";
import checkLogin from '../utils/checkLogin'

function getExpiryDate(daysTillExpiry){
  var expiryDate = new Date(new Date().getTime()+((daysTillExpiry)*24*60*60*1000));

  let month = String(expiryDate.getMonth() + 1);
  let day = String(expiryDate.getDate());
  const year = String(expiryDate.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${year}-${month}-${day}`;
}

export default class AddToFridge extends Component {
  constructor(props) {
    super(props);
    
    this.state = {ingredientName: "", expiryInDays: "", foodType: "Select food type..."};

    this.updatefoodType = this.updatefoodType.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ingredientName: event.target.value})
  }

  handleExpiryChange(event) {
    this.setState({expiryInDays: event.target.value})
  }


  updatefoodType(type){
      this.setState({foodType : type});
  }

  //validation needed
  submit(){
    if(!(this.state.foodType === "Select food type...")){
      if(integerCheck(this.state.expiryInDays)){
        let token = checkLogin();
        axios.post('http://localhost:5000/api/getUser/getUserData',{token: token})
            .then(res => {
                const userIDcode = res.data._id;
                axios.post("http://localhost:5000/api/load_data/add_food", {
                  ingredientName: this.state.ingredientName,
                  expiryDate: getExpiryDate(this.state.expiryInDays),
                  foodType: this.state.foodType, 
                  ID: userIDcode
                });
            });
        setTimeout(function(){
          window.location.reload(); //refresh page
        });
      }else{
        $('#alert-placeholder').html("<div class='alert alert-danger' role='alert'>"
        + "Expiry in days in must be an integer value!");
      }
    }else{
      $('#alert-placeholder').html("<div class='alert alert-danger' role='alert'>"
      + "You must select food type!");
    }
  }

  render() {

    var foodType = this.state.foodType;

    return (
        <div class="container-fluid">
          <div id='alert-placeholder'/>

          <form>
            <div class="form-group">
              <h5 for="inputName">Food name: </h5>
              <input class="form-control" id="inputName" placeholder="(e.g. Breaded Chicken Steak)" 
              value={this.state.ingredientName} onChange={this.handleNameChange.bind(this)}/>
            </div> 

            <div class="form-group">
              <h5 for="inputExpiry">Days till expiry: </h5>
              <input class="form-control" id="inputExpiry" placeholder="Time in days (e.g. 4)"
              value={this.state.expiryInDays} onChange={this.handleExpiryChange.bind(this)}/>
            </div>

            <br />

            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {foodType}
              </button>

              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a onClick={() => this.updatefoodType("Meat")} class="dropdown-item" href="#">Meat</a>
                <a onClick={() => this.updatefoodType("Fruit and Vegetables")} class="dropdown-item" href="#">Fruit and Vegetables</a>
                <a onClick={() => this.updatefoodType("Beverages")} class="dropdown-item" href="#">Beverages</a>
                <a onClick={() => this.updatefoodType("Condiments")} class="dropdown-item" href="#">Condiments</a>
                <a onClick={() => this.updatefoodType("Other")} class="dropdown-item" href="#">Other</a>
              </div>
            </div>
          </form>

          <button onClick={this.submit} type="Submit" class="mx-3 btn btn-secondary float-right">Submit</button>

          <br />

        </ div>
      ); 
  }
}