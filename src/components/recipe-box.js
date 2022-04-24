import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styling.module.css"
import GetRecipeButton from './get-recipe-button';

export default class RecipePanelBox extends Component {
  render() {

    const recipe = this.props.recipe;

    return (     
        <div class="card">
             <img src={recipe.image} class="card-img-top"/>
            <div class="card-body">
                <h5 class="card-title">{recipe.title}</h5>
                <p className={styles.smallerPText} >Time to cook: {recipe.time} minutes</p>
                <GetRecipeButton recipe={recipe} />
            </div>
        </div>
    );
  }
}