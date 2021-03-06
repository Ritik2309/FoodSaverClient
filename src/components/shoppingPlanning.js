import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import AddToShopping from './add-to-shopping';
import ShoppingCollection from './collection.shopping';
import axios from "axios";
import checkLogin from '../utils/checkLogin';

export default class shoppingPlan extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, shoppingList: undefined};
  }
  
  componentDidMount() {
      
      let token = checkLogin();
      
      if (!(token == null)) {
        this.setState({ loggedIn: true });

        axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
          .then(res => {
              const ID = res.data._id
              axios.post("https://my-food-saver.herokuapp.com/api/shopping/load_shopping",{ID: ID})
                .then(res => {
                  //console.log(res.data)
                  this.setState({ shoppingList: res.data});
                
                  this.setState({ isLoading: false });
                
                });
              });
        
      }
  }

  render() {
    const { isLoading, shoppingList } = this.state;
    console.log(shoppingList);
    if (isLoading) {
      return <img class="rounded mx-auto d-block" src="/images/LOADING.gif"/>;
    } 

    return (
    <div class="container">
        <br />
        <h3>Use this section to make a shopping list</h3>
        <p class="text-muted float-left">keep track of what you need to buy!</p>
        <br />
        <br />
        <h3>Add to shopping list</h3>
        <AddToShopping />
        <h3> Shopping list </h3>
        <ShoppingCollection shoppingList={shoppingList} />
        <br />
        <br />

    </ div>
    );
  }
  
}