import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import DMPanelBox from "./DM-post-box";


export default class DMCollection extends Component {
  render() {
 
    const messages = this.props.messages;
    
    posts.reverse();
    
      return (
        <>
        {posts.map((data, index) => {
            if (data) {
              return (
                <>
                <div key={data} class="list-group">
                  
                    <DMPanelBox message={data} />
                
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