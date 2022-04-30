import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import SocialCollection from "./collection.socials";
import AddToSocial from './add-to-social';
import axios from "axios";
import checkLogin from '../utils/checkLogin';
import {getLocation, getImage, setLocationStorage, setImageStorage} from '../utils/storage';

export default class Social extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = { isLoading: true, posts: undefined, imageSelected: getImage("image"), location: getLocation("location")};
    console.log(this.state.location)
  }
  
  componentDidMount() {
      
        let token = checkLogin();
        if (!(token == null)) {
          this.setState({ loggedIn: true });
          if (this.state.imageSelected === null){
            setImageStorage('/images/NO-IMAGE.PNG')
          }
          if (this.state.location === null){
            setLocationStorage('not selected')
          }

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
    const { isLoading, posts, imageSelected, location } = this.state;
    
    console.log(imageSelected);
    if (isLoading) {
      return <img class="rounded mx-auto d-block" src="/images/LOADING.gif"/>;
    } 

    return (
    <div class="container">
        
        <h3>Add Post</h3>
        
        <AddToSocial posts={posts} image = {imageSelected} location = {location}/>
        <h3> Posts </h3>
        <br />
        <SocialCollection posts={posts}/> 
        <br />

    </ div>
    );
  }
  
}