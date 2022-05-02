import React, { Component } from 'react';
import axios from "axios";
import checkLogin from '../utils/checkLogin'

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

export default class FoodCollection extends Component {
  constructor(props) {
    super(props);
    
    this.removeFood = this.removeFood.bind(this);
  }

  removeFood(foodToRemove) { 
    let token = checkLogin();
    axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
        .then(res => {
            const userIDcode = res.data._id;
            axios.post("https://my-food-saver.herokuapp.com/api/load_data/remove_food", {food: foodToRemove, ID: userIDcode}).then(()=>{
              setTimeout(function(){
                     window.location.reload(); //refresh page
                   });
              });
        });
  }

  render() {
    const foods = this.props.foods
    return (
        <div class="container-fluid">
            <dl class="list-group">
                <div class="row">
                        {foods.map((food, index) => {
                        return <div class="col"> 
                            <dt class="list-group-item">{food.ingredientName}
                            <button onClick={() => this.removeFood(food)} type="button" class="my-1 btn btn-danger float-right">Remove</button>
                            </dt>
                            <dd class="list-group-item">Days left: {getDaysTillExpiry(food)}
                            {((getDaysTillExpiry(food) <= 3) && (getDaysTillExpiry(food) > 0)) && //if < 3 days till expiry
                                <span class="float-right badge badge-warning badge-pill">!</span>
                            }
                            {(getDaysTillExpiry(food) <= 0) && //if expired or goes off today
                                <span class="float-right badge badge-danger badge-pill">!</span>
                            }
                            </dd>
                        </div>})}
                </div>
            </dl>
        </div>
    );
  }
}