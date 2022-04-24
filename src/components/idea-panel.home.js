import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import MealIdeaPanelBox from "./meal-idea-box";
import axios from "axios";

function generateRandomIDs() {
  var arrayOfIDs = new Array();
  
  while (arrayOfIDs.length < 8){
    var randID = Math.floor(Math.random() * 874);
    arrayOfIDs.push(randID);
  }

  return arrayOfIDs;
}


export default class MealIdeaPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, recipes: undefined };
  }
  
  componentDidMount() {
    axios.get("https://my-food-saver.herokuapp.com/api/load_data/recipes_list").then(res => {
      this.setState({ recipes: res.data});
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { isLoading, recipes } = this.state;
    const IDs = generateRandomIDs();

    if (isLoading) {
      return <img class="rounded mx-auto d-block" src="/images/LOADING.gif"/>;;
    }

    return ( 
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <MealIdeaPanelBox recipe={recipes[IDs[0]]}/>
          </div>
          <div class="col-sm">
            <MealIdeaPanelBox recipe={recipes[IDs[1]]}/>
          </div>
          <div class="col-sm">
            <MealIdeaPanelBox recipe={recipes[IDs[2]]}/>
          </div>
          <div class="col-sm">
            <MealIdeaPanelBox recipe={recipes[IDs[3]]}/>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <MealIdeaPanelBox recipe={recipes[IDs[4]]}/>
          </div>
          <div class="col-sm">
            <MealIdeaPanelBox recipe={recipes[IDs[5]]}/>
          </div>
          <div class="col-sm">
            <MealIdeaPanelBox recipe={recipes[IDs[6]]}/>
          </div>
          <div class="col-sm">
            <MealIdeaPanelBox recipe={recipes[IDs[7]]}/>
          </div>
        </div>
      </div>
    );
  }
}
