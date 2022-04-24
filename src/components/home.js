import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import MealIdeaPanel from "./idea-panel.home";
import KeepingOnTopOf from "./keeping-on-top.home";
import RecipeSearchBar from "./recipe-search-bar";

export default class Home extends Component {
  render() {
    return (
        <div class="container-fluid">

          <div class="container-fluid">
            <p class="text-muted float-left">Feel free to pick one of our recommended recipes!</p>
            <br />
            <br />
            <RecipeSearchBar />
          </div>
          <br />
          <br />
            <MealIdeaPanel />
          <br />
          <br />
            <KeepingOnTopOf />

        </div> 
    );
  }
}