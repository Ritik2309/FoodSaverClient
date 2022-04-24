import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styling.module.css"
import AddToButton from './add-to-button';

function formatStringArray(stringArray) {
    var formattedStringArray = [];

    stringArray.forEach(string => {
        formattedStringArray.push((stringArray.indexOf(string) + ". " + string));
    });
 
    return formattedStringArray;
}

export default class RecipeGuide extends Component {
  render() {
     
    const recipe = this.props.location.state;

    recipe.ingredients = formatStringArray(recipe.ingredients);
    const nutrients = recipe.nutrients;

    return (     
        <div>
            <br />
            
            
            <AddToButton food={recipe}/>

            <br />
            <br />
            <br />

            <h2 className={styles.alignCentre}>{recipe.title}</h2>
            <h5 class="text-muted text-center"> Time to cook: {recipe.time} minutes.</h5>
            <h5 class="text-muted text-center">{recipe.servings}</h5>

            {recipe.veg &&
                <h5 class="text-muted text-center"> This meal is vegetarian.</h5>
            }

            <br />
            <br />

            <img class="rounded mx-auto d-block" src={recipe.image} />

            <br />

            <h3 className={styles.alignCentre}>What you'll need: </h3>

            <p className={styles.alignCentre}>{recipe.ingredients.map(str => <p>{str}</p>)}</p>

            <br />

            <h3 className={styles.alignCentre}>Method: </h3>

            <p className={styles.scrollbox}> {recipe.instructions}</p>

            <br />

            <h3 className={styles.alignCentre}>Nutritional info: </h3>

            <p className={styles.alignCentre}>Calories: {nutrients.calories}</p>
            <p className={styles.alignCentre}>Carbohydrates: {nutrients.carbohydrateContent}</p>
            <p className={styles.alignCentre}>Fat: {nutrients.fatContent}</p>
            <p className={styles.alignCentre}>Fibre: {nutrients.fiberContent}</p>
            <p className={styles.alignCentre}>Protein: {nutrients.proteinContent}</p>
            <p className={styles.alignCentre}>Saturated Fat: {nutrients.saturatedFatContent}</p>
            <p className={styles.alignCentre}>Sugar: {nutrients.sugarContent}</p>

        </div>
    );
  }
}