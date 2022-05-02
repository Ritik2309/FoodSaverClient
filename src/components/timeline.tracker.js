import React, { Component } from 'react';
import axios from "axios";
import checkLogin from '../utils/checkLogin';
import $ from 'jquery';

function orderFoods(foodsEaten){
    foodsEaten.sort((a, b) => (a.timeEaten.slice(0, 2) - b.timeEaten.slice(0, 2)));

    return foodsEaten;
}

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        
        this.removeMeal = this.removeMeal.bind(this);
      }

    removeMeal(mealToRemove) {
        let token = checkLogin();
        
        axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
        .then(res => {
            const userIDcode = res.data._id;
            axios.post("https://my-food-saver.herokuapp.com/api/load_data/remove_meal", {meal: mealToRemove, ID: userIDcode})
                .then(()=>{
                    setTimeout(function(){
                           window.location.reload(); //refresh page
                         });
                })
            
        });
         
    }
      
    render() {
        const foodsEaten = orderFoods(this.props.foodsEaten) //will be an array of food items read from user database with their props 
        const todaysDate = this.props.todaysDate;
        const userDate = this.props.userDate;

    return (
        <div class="container-fluid">
            <dl class="list-group">
                <div class="row">
                        {((foodsEaten.length === 0) && (todaysDate.valueOf() === userDate.valueOf())) && //if they haven't that day
                        <>
                        <div class="col"> 
                            <dt class="list-group-item">You haven't eaten today!</dt>
                            <dd class="list-group-item">You probably just forgot to track it...</dd>
                        </ div>
                        </> 
                        }
                        {((foodsEaten.length === 0) && !(todaysDate.valueOf() === userDate.valueOf())) && 
                        <>
                        <div class="col"> 
                            <dt class="list-group-item">You didn't eat that day!</dt>
                            <dd class="list-group-item">You probably just forgot to track it...</dd>
                        </ div>
                        </> 
                        }
                        {foodsEaten.map(food => {return <>
                        <div class="col-3"> 
                        <div id="alert-placeholder"/>
                            <dt class="list-group-item">{food.name}
                            <button onClick={() => this.removeMeal(food)} type="button" class="my-1 btn btn-danger float-right">Remove</button>
                            </dt>
                            
                            <dd class="list-group-item">Time eaten: {food.timeEaten}
                            {(food.nutrients.calories !== undefined) &&
                                <p class="float-right">{food.nutrients.calories}</p>
                            }
                            </dd>
                        </ div>
                        </>
                        })
                        }
                </div>
            </dl>
        </div>
    );
  }
}