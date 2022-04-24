import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styling.module.css"
import ReplyPanelBox from './reply-post-box'
import ReplyToPost from './reply-to-post'
import checkLogin from '../utils/checkLogin';
import axios from 'axios';
import RemovePost from './remove-post';

export default class SocialPanelBox extends Component {
  constructor(props) {
    super(props);
    this.state = { userID: undefined, postID: undefined, postUserID: undefined};
  }
  componentDidMount() {
      
    let token = checkLogin();
    if (!(token == null)) {
      
      axios.post('http://localhost:5000/api/getUser/getUserData',{token: token})
        .then(res => {
          console.log(res)
          this.setState({ userID: res.data._id });
            axios.get("http://localhost:5000/api/Social_posts/load_posts").then(result => {
              
              this.setState({ posts: result.data});
              console.log(result.data);
              this.setState({postUserID: result.data._id});
              
               });
            });
       
    }
    
}

  render() {
    
    const post = this.props.posts;
    
    
    return (     
        <div class="card">
                <img src={post.socialPost.imageLink} width={400} height={400} class="card-img-top"/>
                <h5 class="card-title"> {post.socialPost.username} {post.socialPost.entryDate} </h5>
                <p className={styles.smallerPText} >Post: <p class="card-text">{post.socialPost.postMessage}</p></p>
                <ReplyToPost reply={post}/>
                <br></br>
                <RemovePost post={post}/>
                
                
          <h5 class="card-title"> Replies: </h5>
          {post.socialPost.replies.map((data, index) => {
              if (data) {
                return (
                  <>
                  <div key={data} class="list-group">
                    <li class="list-group-item">
                      
                      <ReplyPanelBox reply={data}/>
                      
                    </li>
                  </div>
                  </>
                )	
              }
            else{
              return null
            }
          }) }
        </div> 
        
    );
  }
  
}