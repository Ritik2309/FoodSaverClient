import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import Modal from "./modal.mutable";
import Alert from "./alert";
import styles from "./styling.module.css"
import checkLogin from "../utils/checkLogin";

function getDaysTillExpiry(food){
  var today = new Date();
  let month = String(today.getMonth() + 1); 
  let day = String(today.getDate());
  const year = String(today.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  const todaysDate = `${year}-${month}-${day}`;

  var foodExpiryDate = new Date(food.expiryDate);
  var newTodaysDate = new Date(todaysDate)

  var differenceInTime = newTodaysDate.getTime() - foodExpiryDate.getTime();  
  var differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);  

  return -1*differenceInDays;
}

function generateListOfAllFoodsInFridge(foods){
  var foodsList = "";

  foods.map(food => { 
    foodsList += "- " + food.ingredientName + "\n";
  });

  return foodsList.split('\n').map(str => "<p>" + str + "</p>");
}

function generateListOfFoodsAlmostOOD(foods){
  var foodsList = "";

  foods.map(food => { 
    if((getDaysTillExpiry(food) <= 3) && (getDaysTillExpiry(food) > 0)) {
      foodsList += "- " + food.ingredientName + "\n";
    }
  });

  return foodsList.split('\n').map(str => "<p>" + str + "</p>");
}

function generateListOfFoodsOOD(foods){
  var foodsList = "";

  foods.map(food => { 
    if(getDaysTillExpiry(food) < 0) {
      foodsList += "- " + food.ingredientName + "\n";
    }
  });

  return foodsList.split('\n').map(str => "<p>" + str + "</p>");
}

export default class KeepingOnTopOf extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true 
                 , loggedIn: false
                 , foods: new Array()
                 };
  }

  componentDidMount() {
    let token = checkLogin();

    if (!(token == null)) {
    this.setState({ loggedIn: true });

    axios.post('http://localhost:5000/api/getUser/getUserData',{token: token})
        .then(res => {
            const userIDcode = res.data._id;
            axios.post("http://localhost:5000/api/load_data/load_foods", {ID: userIDcode}).then(res => { 
            this.setState({foods: res.data});
            this.setState({isLoading : false});
            });
    });
    }
  }

  render() {
    const isLoading = this.state.isLoading;
    const loggedIn = this.state.loggedIn;
    const userFoods = this.state.foods;

    if (!loggedIn) {
      return (
      <div class="container-fluid">
        <Alert message={"If you were logged in, here you would see some lists generated from your fridge..."} />
      </div>
        );
    }

    if (loggedIn && isLoading){
        return <img class="rounded mx-auto d-block" src="/images/LOADING.gif"/>;
    }

    return (
    <div class="container">
      
      <h3 className={styles.alignCentre}>Keeping on top of your foods</h3>

      <br />

      <div class="row">
        <div class="col">
          <Modal style={"keepingOnTopOf"} title={"Quick view fridge"} body={generateListOfAllFoodsInFridge(userFoods)}/>
        </div>
        <div class="col">
          <Modal style={"keepingOnTopOf"} title={"Foods you need to throw out! (out of date...)"} body={generateListOfFoodsOOD(userFoods)}/>
        </div>
      </ div>

      <br />
      <br />

      <Modal style={"keepingOnTopOf"} title={"Foods you must use! (less than 3 days left...)"} body={generateListOfFoodsAlmostOOD(userFoods)}/>

      </div>
    );
  }
}