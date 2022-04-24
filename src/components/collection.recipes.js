import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import RecipePanelBox from "./recipe-box";

function generateRandomIDs() {
  var arrayOfIDs = new Array();
  
  while (arrayOfIDs.length < 5){
    var randID = Math.floor(Math.random() * 874);
    arrayOfIDs.push(randID);
  }

  return arrayOfIDs;
}

function generateRandomVegetarianIDs(allRecipes) {
  var arrayOfIDs = new Array();
  
  while (arrayOfIDs.length < 5){
    var randID = Math.floor(Math.random() * 874);
   
    if (allRecipes[randID].veg != null){
      arrayOfIDs.push(randID);
    }
  }

  return arrayOfIDs;
}


export default class Collection extends Component {
  render() {
 
    const recipes = this.props.recipes;
    const vegetarian = this.props.vegetarian;
    
    var IDs = generateRandomIDs();

    if(vegetarian){
        IDs = generateRandomVegetarianIDs(recipes);
    };

    return (
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <RecipePanelBox recipe={recipes[IDs[0]]}/>
          </div>
          <div class="col-sm">
            <RecipePanelBox recipe={recipes[IDs[1]]}/>
          </div>
          <div class="col-sm">
            <RecipePanelBox recipe={recipes[IDs[2]]}/>
          </div>
          <div class="col-sm">
            <RecipePanelBox recipe={recipes[IDs[3]]}/>
          </div>
          <div class="col-sm">
            <RecipePanelBox recipe={recipes[IDs[4]]}/>
          </div>
        </div>
      </div>
    );
  }
}