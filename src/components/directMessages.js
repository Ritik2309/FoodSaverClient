import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import checkLogin from '../utils/checkLogin';
import DMCollection from './collection.DMs';

export default class directMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true, loggedIn: undefined, blocked: undefined, messages: undefined};
  }
  
  componentDidMount() {
      
      let token = checkLogin();
      
      if (!(token == null)) {
        this.setState({ loggedIn: true }); 
        axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
          .then(res => {
              const ID = res.data._id
              console.log(ID)
              axios.post('https://my-food-saver.herokuapp.com/api/directMessage/load_DMs_santized', {ID:ID})
                .then(result=>{
                  this.setState({messages: result.data});
                  
                  this.setState({ isLoading: false });
                })

          });
        
      }
  }

  render() {
    const { isLoading,loggedIn,blocked, messages} = this.state;
    console.log(messages)
    if (isLoading) {
      return <img class="rounded mx-auto d-block" src="/images/LOADING.gif"/>;
    } 

    return (
    <div class="container">
        <br />
        <br />
        <h3> Your DMs </h3>
        <DMCollection allMessages={messages} />
        <br />
        <br />

    </ div>
    );
  }
  
}