import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Collection from "./collection.recipes";
import axios from "axios";
import RecipeSearchBar from './recipe-search-bar';

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, recipes: undefined };
  }
  
  componentDidMount() {
    axios.get("http://localhost:5000/api/load_data/recipes_list").then(res => {
      this.setState({ recipes: res.data});
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { isLoading, recipes } = this.state;

    if (isLoading) {
      return <img class="rounded mx-auto d-block" src="/images/LOADING.gif"/>;
    } 

    return (
    <div class="container">
        <RecipeSearchBar />
        
        <h3> Recommended recipes </h3>

        <br />

        <Collection recipes={recipes} vegetarian={false}/> 

        <br />

        <h3> Vegetarian </h3>

        <br />

        <Collection recipes={recipes} vegetarian={true}/>

        <br />

        <br />
    </ div>
    );
  }
}