import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styling.module.css"
import RemoveItem from './remove-item';

export default class ShoppingPanelBox extends Component {
  render() {

    const shoppingList = this.props.shoppingList
    console.log(shoppingList)

    return (     
        
                  <div lass="list-group">
                    <li class="list-group-item">
                    <p className={styles.smallerPText}>{shoppingList}</p>
                      <RemoveItem itemName={shoppingList}/>
                    </li>
                  </div>
         
        
    );
  }
  
}