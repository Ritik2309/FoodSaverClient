import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery'; 
import {integerCheck, tfTimeCheck} from "../utils/validation";
import axios from 'axios';
import checkLogin from '../utils/checkLogin';

function getTodaysCalories(foodsEaten){
    var calorieTotal = 0;
  
    foodsEaten.forEach(function(food) {
      if (food.nutrients.calories !== undefined){
        calorieTotal += parseInt(food.nutrients.calories.slice(0, -2));
      }
    });
  
    return calorieTotal;
  }

function getTodaysDate(){
    var today = new Date();
    let month = String(today.getMonth() + 1); 
    let day = String(today.getDate());
    const year = String(today.getFullYear());
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return `${year}-${month}-${day}`;
  }

  function getExpiryDate(daysTillExpiry){
    var expiryDate = new Date(new Date().getTime()+((daysTillExpiry)*24*60*60*1000));
  
    let month = String(expiryDate.getMonth() + 1);
    let day = String(expiryDate.getDate());
    const year = String(expiryDate.getFullYear());
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return `${year}-${month}-${day}`;
  }


export default class AddToButton extends Component {
    constructor(props) {
        super(props);

        this.state = {food: this.props.food
                    , context: $('body')
                    , diet: undefined
                    , buttonPressed: undefined
                    , userInput: ""
                    , loggedIn: false
                    };

        this.submit = this.submit.bind(this);

        this.addToFridge = this.addToFridge.bind(this);
        this.addToTracker = this.addToTracker.bind(this);

        this.updateModal = this.updateModal.bind(this);

        this.checkWithinCalories = this.checkWithinCalories.bind(this);
    }

    componentDidMount() {
        let token = checkLogin();
    
        if (!(token == null)) {
          this.setState({ loggedIn: true });
        }
      }

    async checkWithinCalories(){
        const nutrients = {
            calories: this.state.food.nutrients.calories + "kcal",
            carbohydrateContent:  this.state.food.nutrients.carbohydrateContent + "g",
            fatContent: this.state.food.nutrients.fatContent + "g",
            fiberContent: this.state.food.nutrients.fiberContent + "g",
            proteinContent: this.state.food.nutrients.proteinContent + "g",
            saturatedFatContent: this.state.food.nutrients.saturatedFatContent + "g",
            };

        let token = checkLogin();
        var withinLimit = true;

        await axios.post('http://localhost:5000/api/getUser/getUserData',{token: token})
            .then(res => {
            const calorieLimit = res.data.calorieLimit;
            const userIDcode = res.data._id;

            axios.post("http://localhost:5000/api/load_data/load_today", {comparisonDate: getTodaysDate(), ID: userIDcode})
                .then(res => {
                    this.setState({ diet: res.data});

                    if ((parseInt(nutrients.calories.slice(0, -2)) + getTodaysCalories(this.state.diet)) > calorieLimit){
                    $('#alert-placeholder2').html("<div class='alert alert-warning' role='alert'>"
                    + "Don't eat that, you'll exceed your daily calorie limit!</div>");
                    withinLimit = false;
                    }
                }); 
        });
        if(withinLimit){
            return true;
        }
    }

    async addToFridge() {
        await this.setState({buttonPressed: "Add to fridge"});
        this.updateModal();
    }

    async addToTracker() {
        await this.setState({buttonPressed: "Add to tracker"});
        this.updateModal();
    }

    handleUserInputChange(event) {
        this.setState({userInput: event.target.value});
    }

    updateModal() {
        var modal = this.state.context.find('#addToButtonModal');
        modal.find('.modal-title').text(this.state.buttonPressed);

        modal.find('.food-name').text(this.state.food.title);

        modal.find('.food-cals').text(this.state.food.nutrients.calories);
        modal.find('.food-carbs').text(this.state.food.nutrients.carbohydrateContent);
        modal.find('.food-fat').text(this.state.food.nutrients.fatContent);
        modal.find('.food-fibre').text(this.state.food.nutrients.fiberContent);
        modal.find('.food-protein').text(this.state.food.nutrients.proteinContent);
        modal.find('.food-satfat').text(this.state.food.nutrients.saturatedFatContent);

        modal.find('#mutableInput').on('input', 
        () => {this.setState.userInput = modal.find('#mutableInput').val();});

        modal.find('#submitButton').on("click", this.submit);
        
        if (this.state.buttonPressed === "Add to fridge"){
            this.setState({buttonPressed: "Add to fridge"});
            modal.find('.inputHeader').text("Days till expiry: ");
        }
        else if (this.state.buttonPressed === "Add to tracker"){
            this.setState({buttonPressed: "Add to tracker"});
            modal.find('.inputHeader').text("Time eaten: (in format 00:00 24h clock)");
        }

    }

    //validation needed
    submit(){
        console.log(this.state.userInput)
        if (this.state.buttonPressed === "Add to tracker"){
            if(this.checkWithinCalories()){
                if(tfTimeCheck(this.state.userInput)){
                    const nutrients = {
                        calories: this.state.food.nutrients.calories,
                        carbohydrateContent:  this.state.food.nutrients.carbohydrateContent,
                        fatContent: this.state.food.nutrients.fatContent,
                        fiberContent: this.state.food.nutrients.fiberContent,
                        proteinContent: this.state.food.nutrients.proteinContent,
                        saturatedFatContent: this.state.food.nutrients.saturatedFatContent,
                    };
                
                    let token = checkLogin();
                
                    axios.post('http://localhost:5000/api/getUser/getUserData',{token: token})
                        .then(res => {
                            const userIDcode = res.data._id;
                            axios.post("http://localhost:5000/api/load_data/add_meal", {
                            name: this.state.food.title,
                            timeEaten: this.state.userInput,
                            nutrients: nutrients,
                            dateEaten: getTodaysDate(),
                            ID: userIDcode
                            }); 
                    });

                    setTimeout(function(){
                        window.location.reload(); //refresh page
                    });
                }else{
                    $('#alert-placeholder2').html("<div class='alert alert-danger' role='alert'>"
                    + "Time must be in format HH:MM (24h clock)!");
                }
            }
        }else if(this.state.buttonPressed === "Add to fridge"){
            console.log(this.state.userInput)
            if(integerCheck(this.state.userInput)){
                let token = checkLogin();
                axios.post('http://localhost:5000/api/getUser/getUserData',{token: token})
                    .then(res => {
                        const userIDcode = res.data._id;
                        axios.post("http://localhost:5000/api/load_data/add_food", {
                        ingredientName: this.state.food.title,
                        expiryDate: getExpiryDate(this.state.userInput),
                        foodType: "Other", 
                        ID: userIDcode,
                        });
                    });
                setTimeout(function(){
                    window.location.reload(); //to refresh page
                });
            }else{
                $('#alert-placeholder2').html("<div class='alert alert-danger' role='alert'>"
                    + "Days till expiry must be an integer!");
            }
        }
      }


    render() {
        return (
        <>
            {(this.state.loggedIn) &&
            <>
                <button onClick={this.addToFridge} class="my-2 mx-2 btn btn-dark float-right" type="button" data-toggle="modal" data-target="#addToButtonModal">
                Add to fridge
                </button>
                <button onClick={this.addToTracker} class="my-2 mx-2 btn btn-dark float-right" type="button" data-toggle="modal" data-target="#addToButtonModal">
                Add to tracker
                </button>
            </>
            }
            <div class="modal fade" id="addToButtonModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="modalTitle"></h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" id="modalBody">
                            <div id="alert-placeholder2" />

                            <br/>

                            <h5>Name:</h5>
                            <div class="food-name"/>

                            <br />

                            <div class="row">
                                <div class="col">
                                    <h5>Calories:</h5>
                                    <div class="food-cals"/>
                                </div>
                                <div class="col">
                                    <h5>Carb content:</h5>
                                    <div class="food-carbs"/>
                                </div>
                            </div>

                            <br/>

                            <div class="row">
                                <div class="col">        
                                    <h5>Fat content:</h5>
                                    <div class="food-fat"/>
                                </div>
                                <div class="col"> 
                                    <h5>Fibre content:</h5>
                                    <div class="food-fibre"/>
                                </div>
                            </div>

                            <br/>

                            <div class="row">
                                <div class="col">
                                    <h5>Protein content:</h5>
                                    <div class="food-protein"/>
                                </div>
                                <div class="col">
                                    <h5>Saturated fat content:</h5>
                                    <div class="food-satfat"/>
                                </div>
                            </div>

                            <br/>
                            
                            <form>
                                <div class="form-group">
                                    <h5 class="inputHeader" for="addToInput"/>
                                    <input class="form-control" id="mutableInput" onChange={this.handleUserInputChange.bind(this)}/>
                                </div> 
                            </form>

                            <button id="submitButton" class="mx-3 btn btn-secondary float-right">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}