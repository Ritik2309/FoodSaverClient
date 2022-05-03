import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import DMPanelBox from "./DM-post-box";



export default class DMCollection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.allMessages)
    let allMessages = this.props.allMessages;
    
    
      return (
        <>
        {allMessages.map((data, index) => {
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