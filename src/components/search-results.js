import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styling.module.css" 
import GetRecipeButton from "./get-recipe-button";
import AddToButton from './add-to-button';

export default class SearchResults extends Component {
  render() {  

    const results = this.props.results;

    return (
            <>
            {results.map((data, index) => {
                if (data) {
                  return (
                    <>
                    <div key={data} class="list-group">
                      <li class="list-group-item">
                        <img class="float-left" className={styles.recipePreviewSize} src={data.image}></img>

                        <AddToButton food={data}/>

                        <br/>
                        <br/>
                        <br/>

                        <h2 class="my-0"> Recipe name: {data.title} </h2>

                        <GetRecipeButton recipe={data} wide={true}/>
                    </li>
                    </div>
                    </>
                   )	
                 }
                 return null
            }) }
            </>
    );
  }
}

