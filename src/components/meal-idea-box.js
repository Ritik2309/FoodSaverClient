import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styling.module.css"
import GetRecipeButton from './get-recipe-button';

export default class MealIdeaPanelBox extends Component {
  render() { 

    const recipe = this.props.recipe; 

    return (
        <div>
            <img className={styles.ideaPanelSize} src={recipe.image}  alt="Recipe"></img>
            <GetRecipeButton recipe={recipe} wide={true}/>
        </div>      
    );
  }
}
