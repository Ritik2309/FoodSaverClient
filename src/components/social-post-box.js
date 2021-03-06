import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ReplyPanelBox from './reply-post-box'
import ReplyToPost from './reply-to-post';
import DM from './send-DM';
import RemovePost from './remove-post';


export default class SocialPanelBox extends Component {
  constructor(props) {
    super(props);
    this.state={postID: this.props.posts._id}
  }

  componentDidMount() {
      
  }

  render() {
    const postID = this.state.postID
    console.log(postID)
    const Post = this.props.posts;
    if (Post.socialPost.imageLink === null){
      Post.socialPost.imageLink = "/images/NO-IMAGE.PNG";
    }
    if (Post.socialPost.location === null){
      Post.socialPost.location("location not selected");
    }
    
    return (     
        <div class="card">
                <img src={Post.socialPost.imageLink} width={400} height={400} class="card-img-top"/>
                <h5 class=" card-text"> {Post.socialPost.username} {Post.socialPost.entryDate}  </h5>
                <p >Post: <p class="card-title" style={{fontWeight: 'bold'}}>{Post.socialPost.postMessage}</p>  </p>
                <p >Suggested meet up Location: <p class="card-title" style={{fontWeight: 'bold'}}>{Post.socialPost.location}</p></p>
                
                <div class="modal fade" id="send-DM" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h3 class="modal-title" id="modalTitle">Send DM</h3>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                      
                      </div>
                    </div>
                  </div>
                </div>
                <div> 
                  {(!Post.userID) && // for only allowing a user to send others a DM and not themselves
                  <button class="mx-3 btn btn-success btn-sm"  data-toggle="modal" data-target="#send-DM">
                    Send DM 
                  </button>  && <DM postID={Post._id}/>
                  }

                
                </div>
                
                <ReplyToPost reply={Post}/>
                
                <br></br>
                <RemovePost post={Post}/>
                
                
                
                
          <h5 class="card-title"> Replies: </h5>
          {Post.socialPost.replies.map((data, index) => {
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