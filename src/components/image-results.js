import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styling.module.css" 
import { Link } from 'react-router-dom';
import {setImageStorage} from "../utils/storage";

export default class ImageResults extends Component {
  render() {  

    const results = this.props.images;
    
    
    return (
            <>
           
            {results.map((data, index) => {
                if (data) {
                  return (
                    <>
                          <div key={data._id} class="list-group">
                            <li class="list-group-item">
                            <div class="card">
                            <img class="float-left" className={styles.recipePreviewSize} src={data.image}></img>
                            
                            <Link to={{
                                pathname: "/social",
                                image: data.image,
                              
                            }}>
                            
                            <button class="float-right" type="submit" onClick={setImageStorage(data.image)}>Select Image</button>
                            </Link>
                             
                              </div>
                              </li>
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

