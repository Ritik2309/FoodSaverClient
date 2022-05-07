import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ImageBox from './image-box';

export default class ImageResults extends Component {
  render() {  

    const results = this.props.images;
    
    
    return (
            <>
           
            {results.map((data, index) => {
                if (data) {
                  return (
                    <>
                    <div key={data} class="list-group">
                    <ImageBox data = {data}/>        
                              
                    </div>
                    </>
                   )	
                 }
                 return null
            }) }
            </>
    );
  }
}

