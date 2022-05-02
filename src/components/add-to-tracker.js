import React, { Component } from 'react';
import axios from "axios";
import $ from 'jquery';
import {integerCheck, tfTimeCheck} from "../utils/validation";
import checkLogin from '../utils/checkLogin'
import sleep from '../utils/refresh';

function getTodaysCalories(foodsEaten){
  var calorieTotal = 0;

  foodsEaten.forEach(function(food) {
    if (food.nutrients.calories !== undefined){
      calorieTotal += parseInt(food.nutrients.calories.slice(0, -2));
    }
  });

  return calorieTotal;
}


export default class AddToTracker extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        name: undefined, 
        timeEaten: undefined, 
        calories: 0, 
        carbohydrateContent: 0,
        fatContent: 0, 
        fiberContent: 0,
        proteinContent: 0, 
        saturatedFatContent: 0,
        dateEaten: this.props.dateBeingViewed,
        diet: undefined
    };

    this.submit = this.submit.bind(this);
    this.checkWithinCalories = this.checkWithinCalories.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleTimeChange(event) {
    
    this.setState({timeEaten: event.target.value});
    console.log(this.state.timeEaten)
  }

  handleCalorieChange(event) {
    this.setState({calories: event.target.value});
  }

  handleCarbsChange(event) {
    this.setState({carbohydrateContent: event.target.value});
  }

  handleFatChange(event) {
    this.setState({fatContent: event.target.value});
  }

  handleFiberChange(event) {
    this.setState({fiberContent: event.target.value});
  }

  handleProteinChange(event) {
    this.setState({proteinContent: event.target.value});
  }

  handleSatFatChange(event) {
    this.setState({saturatedFatContent: event.target.value});
    
  }

  async checkWithinCalories(){
    const nutrients = {
      calories: this.state.calories + "kcal",
      carbohydrateContent:  this.state.carbohydrateContent + "g",
      fatContent: this.state.fatContent + "g",
      fiberContent: this.state.fiberContent + "g",
      proteinContent: this.state.proteinContent + "g",
      saturatedFatContent: this.state.saturatedFatContent + "g",
     };

    let token = checkLogin();
    var withinLimit = true;

    await axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
      .then(res => {
       const calorieLimit = res.data.calorieLimit;
       const userIDcode = res.data._id;

        axios.post("https://my-food-saver.herokuapp.com/api/load_data/load_today", {comparisonDate: this.state.dateEaten, ID: userIDcode})
            .then(res => {
              this.setState({ diet: res.data});

              if ((parseInt(nutrients.calories.slice(0, -2)) + getTodaysCalories(this.state.diet)) > calorieLimit){
                $('#alert-placeholder').html("<div class='alert alert-warning' role='alert'>"
                + "Don't eat that, you'll exceed your daily calorie limit!</div>");
                withinLimit = false;
             }
            }); 
    });

    if(withinLimit){
      return true;
    }
  }

  submit(){
    if(this.checkWithinCalories()){
      if((integerCheck(this.state.calories))&&(integerCheck(this.state.carbohydrateContent))
      &&(integerCheck(this.state.fatContent))&&(integerCheck(this.state.fiberContent))
      &&(integerCheck(this.state.proteinContent))&&(integerCheck(this.state.saturatedFatContent))){
          if(tfTimeCheck(this.state.timeEaten)){
            const nutrients = {
                calories: this.state.calories + "kcal",
                carbohydrateContent:  this.state.carbohydrateContent + "g",
                fatContent: this.state.fatContent + "g",
                fiberContent: this.state.fiberContent + "g",
                proteinContent: this.state.proteinContent + "g",
                saturatedFatContent: this.state.saturatedFatContent + "g",
            };

            let token = checkLogin();

            axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
              .then(res => {
                  const userIDcode = res.data._id;
                  axios.post("https://my-food-saver.herokuapp.com/api/load_data/add_meal", {
                    name: this.state.name,
                    timeEaten: this.state.timeEaten,
                    nutrients: nutrients,
                    dateEaten: this.state.dateEaten,
                    ID: userIDcode
                  }).then(()=>{
                        setTimeout(function(){
                           window.location.reload(); //refresh page
                         });
                })
            })
             
          }else{
            $('#alert-placeholder').html("<div class='alert alert-warning' role='alert'>"
                + "Time needs to be in 24h format!</div>");
            console.log()    
          }
      }else{
        $('#alert-placeholder').html("<div class='alert alert-warning' role='alert'>"
                + "All nutritional values must be integers!</div>");
      }
    }
    
  }

  render() {

    return (
        <div class="container-fluid">
          <div id="alert-placeholder"/>

          <form>
            <div class="form-group">
              <h5 htmlFor="inputName">Meal name: </h5>
              <input class="form-control" id="inputName" placeholder="(e.g. Breaded Chicken Steak and Rice)" 
              value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
            </div> 

            <div class="form-group">
              <h5 htmlFor="inputTime">Time eaten: </h5>
              <input class="form-control" id="inputTime" placeholder="Time using 24h clock (e.g. 17:00)"
              value={this.state.timeEaten} onChange={this.handleTimeChange.bind(this)}/>
            </div>

            <div class="form-group">
              <h5 htmlFor="inputNutrients">Nutrients: (Optional)</h5>
              <div class="row">
                <div class="col">
                    <input class="form-control" id="inputCalories" placeholder="Calories - kcal"
                    value={this.state.calories} onChange={this.handleCalorieChange.bind(this)}/>
                </div><div class="col">
                    <input class="form-control" id="inputCarbs" placeholder="Carbohydrates - grams"
                    value={this.state.carbohydrateContent} onChange={this.handleCarbsChange.bind(this)}/>
                </div>
              </div>
              <div class="row">
                <div class="col">
                    <input class="form-control" id="inputFat" placeholder="Fat - grams"
                    value={this.state.fatContent} onChange={this.handleFatChange.bind(this)}/>
                </div><div class="col">
                    <input class="form-control" id="inputFiber" placeholder="Fiber - grams"
                    value={this.state.fiberContent} onChange={this.handleFiberChange.bind(this)}/>
                </div>
              </div>
              <div class="row">
                <div class="col"> 
                    <input class="form-control" id="inputProtein" placeholder="Protein - grams"
                    value={this.state.proteinContent} onChange={this.handleProteinChange.bind(this)}/>
                </div><div class="col">
                    <input class="form-control" id="inputSaturatedFat" placeholder="Saturated Fat - grams"
                    value={this.state.saturatedFatContent} onChange={this.handleSatFatChange.bind(this)}/>
                </div>
              </div>
            </div>
            <br />
          </form>
          <button onClick={this.submit} class="mx-3 btn btn-success float-right">Submit</button>
          <br />
        </ div>
      ); 
  }
}