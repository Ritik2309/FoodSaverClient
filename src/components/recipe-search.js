import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import RecipeSearchBar from './recipe-search-bar';
import SearchResults from './search-results';

function searchForRecipes(recipes, title){
    var matches = [];

    var stringSimilarity = require("string-similarity");

    recipes.forEach(recipe => {
        if (typeof recipe.title === 'string'){
            var similarity = stringSimilarity.compareTwoStrings(recipe.title, title);

            if(similarity > 0.4){ 
                matches.push(recipe);
            };
        }
    });

    console.log(matches);

    return matches;
}


export default class RecipeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, recipes: undefined, searchFor: this.props.userInput };
  }
  
  componentDidMount() {
    axios.get("https://my-food-saver.herokuapp.com/api/load_data/recipes_list").then(res => {
      this.setState({ recipes: res.data});
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { isLoading, recipes, searchFor} = this.state;
    const currentSearch = this.props.location.state;
    var searchResults = [];

    if (isLoading) {
      return <img class="rounded mx-auto d-block" src="/images/LOADING.gif"/>;
    }

    if (!isLoading) {
        searchResults = searchForRecipes(recipes, currentSearch);
    } 

    return (
    <div class="container">
        <RecipeSearchBar />
        <h3>Search results for {currentSearch}...</h3>
        <SearchResults results={searchResults} />
    </ div>
    );
  }
}