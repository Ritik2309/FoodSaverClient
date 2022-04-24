import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class RecipeSearchBar extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userInput: "",
        }
 
    }

    handleUserInputChange(event) {
        this.setState({userInput: event.target.value})
      }

    handleButtonClicked() {
    }
    

    render() {
        return (
            <div>
            <Link to={{
                pathname: "/search",
                state: this.state.userInput
            }}>
            <button onClick={this.handleButtonClicked.bind(this)} class="float-right" type="submit">Search</button>
            </Link>

            <input class="float-right" type="text" placeholder="Search recipes" name="recipe-search-bar"
                   value={this.state.userInput} onChange={this.handleUserInputChange.bind(this)}/>
            </div>
        ); 
  }
}