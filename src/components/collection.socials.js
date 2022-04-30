import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import SocialPanelBox from "./social-post-box";


export default class SocialCollection extends Component {
  render() {
 
    const posts = this.props.posts;
    
    posts.reverse();
    
      return (
        <>
        {posts.map((data, index) => {
            if (data) {
              return (
                <>
                <div key={data} class="list-group">
                  
                    <SocialPanelBox posts={data} />
                
                </div>
                <br />
                <br />
                </>
              )	
            }
            return null
        }) }
        </>
  );
    
    
  }
}