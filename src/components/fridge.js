import React, { Component } from 'react';
import axios from 'axios';
import checkLogin from '../utils/checkLogin' 
import FoodCollection from "./collection.fridge";
import AddToFridge from './add-to-fridge';



function getFoodsOfType(usersFoods, type){
  var foodsOfType = new Array();

  usersFoods.map(food => { 
    if (food.foodType === type){
      foodsOfType.push(food);
    }
  });

  return foodsOfType;
}

export default class Fridge extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, loggedIn: false,
                   Meats: new Array(), FruitAndVeg: new Array(), Beverages: new Array(),
                   Condiments: new Array(), Other: new Array(),
                 };
  }

  componentDidMount() {
    let token = checkLogin();

    if (!(token == null)) {
      this.setState({ loggedIn: true });

      axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
        .then(res => {
            const userIDcode = res.data._id;
            axios.post("https://my-food-saver.herokuapp.com/api/load_data/load_foods", {ID: userIDcode}).then(res => { 
              this.setState({Meats : getFoodsOfType(res.data, "Meat")});
              this.setState({FruitAndVeg : getFoodsOfType(res.data, "Fruit and Vegetables")});
              this.setState({Beverages : getFoodsOfType(res.data, "Beverages")});
              this.setState({Condiments : getFoodsOfType(res.data, "Condiments")});
              this.setState({Other : getFoodsOfType(res.data, "Other")});
              this.setState({isLoading : false});
            });
      });
    }
  }
  render() {
    const isLoading = this.state.isLoading;
    const loggedIn = this.state.loggedIn;

    if (loggedIn && isLoading){
        return <img class="rounded mx-auto d-block" src="/images/LOADING.gif"/>;
    }

    
    return (
        <div class="container-fluid"> 
        <button type="button" class="mx-3btn btn-success float-right" data-toggle="modal" data-target="#addFoodModal">
            Add food
          </button>

          <br />

          <h2>Meat</h2>

          
          
          <div class="modal fade" id="addFoodModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title" id="modalTitle">Add food</h3>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <AddToFridge/>
                </div>
              </div>
            </div>
          </div>
          
          <FoodCollection foods={this.state.Meats}/>

          <br />

          <h2>Fruit and Vegetables</h2>

          <FoodCollection foods={this.state.FruitAndVeg}/>

          <br />

          <h2>Beverages</h2>

          <FoodCollection foods={this.state.Beverages}/>

          <br />

          <h2>Condiments</h2>

          <FoodCollection foods={this.state.Condiments}/>

          <br />

          <h2>Other</h2>

          <FoodCollection foods={this.state.Other}/>

          <br />
        
        </div>
    );
  }
}