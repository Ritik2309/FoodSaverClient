import React, { Component } from 'react';
import axios from "axios";
import $ from 'jquery';
import checkLogin from '../utils/checkLogin'
import refresh from '../utils/refresh'

export default class AddToShopping extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        itemName: undefined, 
        
    };

    this.submit = this.submit.bind(this);
    
  }

  handleNameChange(event) {
    this.setState({itemName: event.target.value});
  }

  
  submit(){
    
            let token = checkLogin();

            axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
              .then(res => {
                  const userIDcode = res.data._id;
                  axios.post("https://my-food-saver.herokuapp.com/api/shopping/add_item", {
                    name: this.state.itemName,
                    ID: userIDcode
                  });
            });
            refresh(100)
            // setTimeout(function(){
            //   window.location.reload(); //refresh page
            // });
  }  

  render() {

    return (
        <div class="container-fluid">
          <div id="alert-placeholder"/>

          <form>
            <div class="form-group">
              <h5 for="inputName">Item name: </h5>
              <input class="form-control" id="inputName" placeholder="(e.g. Bread, Milk, Steak, Rice...)" 
              value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
            </div> 
          </form>
          <button onClick={this.submit} class="mx-3 btn btn-secondary float-right">Add</button>
          <br />
        </ div>
      ); 
  }
}
