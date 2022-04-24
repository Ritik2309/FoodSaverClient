import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import SocialCollection from "./collection.socials";
import AddToSocial from './add-to-social';
import axios from "axios";
import checkLogin from '../utils/checkLogin';

export default class Social extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = { isLoading: true, posts: undefined, imageSelected: this.props.location.image};
  }
  
  componentDidMount() {
      
        let token = checkLogin();
        if (!(token == null)) {
          this.setState({ loggedIn: true });

          axios.post('https://my-food-saver.herokuapp.com/api/getUser/getUserData',{token: token})
            .then(res => {
                
                axios.get("https://my-food-saver.herokuapp.com/api/Social_posts/load_posts").then(res => {
                  
                  this.setState({ posts: res.data});
                  
                  this.setState({ isLoading: false });
                  
                   });
                });
           
        }
  }

  render() {
    const { isLoading, posts, imageSelected } = this.state;
    
    console.log(imageSelected);
    if (isLoading) {
      return <img class="rounded mx-auto d-block" src="/images/LOADING.gif"/>;
    } 

    return (
    <div class="container">
        
        <h3>Add Post</h3>
        
        <AddToSocial posts={posts} image = {imageSelected}/>
        <h3> Posts </h3>
        <br />
        <SocialCollection posts={posts} /> 
        <br />

    </ div>
    );
  }
  
}