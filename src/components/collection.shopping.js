import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import ShoppingPanelBox from "./shopping-panel-box";

export default class ShoppingCollection extends Component {
  render() {
 
    const shoppingList = this.props.shoppingList;
    console.log(this.props)
    
      return (
        <>
        {shoppingList.map((data, index) => {
            if (data) {
              return (
                <>
                <div key={data} class="list-group">
                  <li class="list-group-item">
                    
                    <ShoppingPanelBox shoppingList={data}/>
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