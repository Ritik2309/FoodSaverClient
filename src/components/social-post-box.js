import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ReplyPanelBox from './reply-post-box'
import ReplyToPost from './reply-to-post';
import sendDM from './send-DM';
import checkLogin from '../utils/checkLogin';
import axios from 'axios';
import RemovePost from './remove-post';
import { Button } from 'antd';
import { setInStorage } from '../utils/storage';

export default class SocialPanelBox extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
      

    
}

  render() {
    
    const post = this.props.posts;
    if (post.socialPost.imageLink === null){
      post.socialPost.imageLink = "/images/NO-IMAGE.PNG";
    }
    if (post.socialPost.location === null){
      post.socialPost.location("location not selected");
    }
    
    return (     
        <div class="card">
                <img src={post.socialPost.imageLink} width={400} height={400} class="card-img-top"/>
                <h5 class=" card-text"> {post.socialPost.username} {post.socialPost.entryDate}  </h5>
                <p >Post: <p class="card-title" style={{fontWeight: 'bold'}}>{post.socialPost.postMessage}</p>  </p>
                <p >Suggested meet up Location: <p class="card-title" style={{fontWeight: 'bold'}}>{post.socialPost.location}</p></p>
                <ReplyToPost reply={post}/>
                <br></br>
                <RemovePost post={post}/>
                <sendDM postID={post._id} username={post.socialPost.username}/> 
                
                
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