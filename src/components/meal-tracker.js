import React, { Component } from 'react';
import Timeline from "./timeline.tracker";
import NutritionInfo from "./nutrition-display.tracker";
import AddToTracker from './add-to-tracker';
import RecipeSearchBar from "./recipe-search-bar";
import Login from "./login";
import Alert from "./alert";
import $ from 'jquery';
import {dateCheck} from "../utils/validation";
import checkLogin from '../utils/checkLogin';
import { Link } from 'react-router-dom';
import axios from "axios";

function getTodaysDate(){
  var today = new Date();
  let month = String(today.getMonth() + 1); 
  let day = String(today.getDate());
  const year = String(today.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${year}-${month}-${day}`;
}

export default class MealTracker extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, diet: undefined, date: this.props.location.state, userDate: "", todaysDate: getTodaysDate()};
  }
  
  componentDidMount() {
    let token = checkLogin();
    const dateForPost = this.props.location.state;
    console.log('dateForPost: ', dateForPost);
    if (!(token == null)) {
      this.setState({ loggedIn: true });

      axios.post('http://localhost:5000/api/getUser/getUserData',{token: token})
        .then(res => {
            const userIDcode = res.data._id;
            console.log('userIDcode', userIDcode);
            axios.post('http://localhost:5000/api/load_data/load_today', {comparisonDate: dateForPost, ID: userIDcode})
            .then(res => {
              //console.log(res);
              this.setState({ diet: res.data});
              this.setState({ isLoading: false });
            }); 
        });
    }
  }

  handleUserDateChange(event) {
    this.setState({userDate: event.target.value})
  }
  
  handleTodayClick(){
    if(dateCheck(this.state.todaysDate)){
      setTimeout(function(){
        window.location.reload(); // to refresh page
      });

    }else if(!(dateCheck(this.state.todaysDate))){
      $('#alert-placeholder2').html("<div class='alert alert-danger' role='alert'>"
      + "Date must be in format YYYY-MM-DD!</div><br/><br/>");
    }
  }
  handleGoClick(){
    if(dateCheck(this.state.userDate)){
      setTimeout(function(){
        window.location.reload(); // to refresh page
      });

    }else if(!(dateCheck(this.state.userDate))){
      $('#alert-placeholder2').html("<div class='alert alert-danger' role='alert'>"
      + "Date must be in format YYYY-MM-DD!</div><br/><br/>");
    }
  }
  render() {
    const isLoading = this.state.isLoading;
    const loggedIn = this.state.loggedIn;
    const diet = this.state.diet;
    const date = this.state.date;

    if (!loggedIn) {
      return (
      <div class="container-fluid">
        <Alert message={"You need to log in before you can open your meal tracker!"} />
        <Login />
      </div>
      );
    }

    if (loggedIn && isLoading){
      return <img class="rounded mx-auto d-block" src="/images/LOADING.gif"/>;
    } 

    return (
      <>
        <br/>
        <div>
          <div id="alert-placeholder2"/>
          <h2 class="float-left">{date}</h2>
          <Link to={{
                pathname: "/tracker",
                state: this.state.todaysDate,
            }}>
          <button onClick={this.handleTodayClick.bind(this)} type="button" class="mx-2 py-1 btn btn-dark float-right">Today: {this.state.todaysDate} </button>
          </Link>

          <Link to={{
                pathname: "/tracker",
                state: this.state.userDate,
            }}>
          <button onClick={this.handleGoClick.bind(this)} type="button" class="mx-2 py-1 btn btn-dark float-right">Go</button>
          </Link>
            
          <input class="py-1 float-right" type="text" placeholder="YYYY-MM-DD" name="date_search_bar"
                    value={this.state.userDate} onChange={this.handleUserDateChange.bind(this)}/>
          </div>

        <br />
        <br />
          
        <RecipeSearchBar />

        <br />
        <br />

        <div class="container-fluid">
            <h5 class="text-muted">Meal Timeline</h5>

            <button type="button" class="mx-3 btn btn-secondary float-right" data-toggle="modal" data-target="#addMealModal">
            Add meal
            </button>
            
            <div class="modal fade" id="addMealModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="modalTitle">Add meal</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <AddToTracker dateBeingViewed={date}/>
                  </div>
                </div>
              </div>
            </div>

            <br />

            <Timeline foodsEaten={diet} userDate={this.state.date} todaysDate={this.state.todaysDate}/>

            <br />

            <h5 class="text-muted float-left">Today's nutrition (any macronutrients not provided will not be displayed)</h5>

            <br />
            <br />

            <NutritionInfo foodsEaten={diet}/>

        </div>
      </>
    );
  }
}