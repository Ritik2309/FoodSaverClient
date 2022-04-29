import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import SoocialPanelBox from "./social-post-box";
import styles from "./styling.module.css" 


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
                  <li class="list-group-item">
                    
                    <SoocialPanelBox posts={data}/>
                </li>
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