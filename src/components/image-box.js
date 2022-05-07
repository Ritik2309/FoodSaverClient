import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styling.module.css"
import { setImageStorage } from '../utils/storage';

import { Link } from 'react-router-dom';

export default class ImageBox extends Component {
  render() {

    const data = this.props.data;

    return (     
      <div class="card">
      <img class="float-left" className={styles.recipePreviewSize} src={data.image}></img>
      
      <Link to={{
          pathname: "/social",
          image: data.image
        
      }}>
      
      <button class="float-right" type="submit" onClick={setImageStorage(data.image)}>Select Image</button>
      </Link>
       
        </div>
    );
  }
}