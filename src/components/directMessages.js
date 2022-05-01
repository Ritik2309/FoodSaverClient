import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import AddToShopping from './send-DM';
import ShoppingCollection from './collection.messages';
import axios from "axios";
import checkLogin from '../utils/checkLogin';
import FoodCollection from './collection.messages';

export default class directMessages extends Component {
  constructor(props) {
    super(props);
    this.state = { blocked: undefined, messages: undefined};
  }
  
  componentDidMount() {
      
      let token = checkLogin();
      
      if (!(token == null)) {
        this.setState({ loggedIn: true });

        axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
          .then(res => {
              const ID = res.data._id
          });
        
      }
  }

  render() {
    const { isLoading, messages } = this.state;
    console.log(shoppingList);
    if (isLoading) {
      return <img class="rounded mx-auto d-block" src="/images/LOADING.gif"/>;
    } 

    return (
    <div class="container">
        <br />
        <br />
        <h3> Your DMs </h3>
        <DMCollection shoppingList={shoppingList} />
        <br />
        <br />

    </ div>
    );
  }
  
}