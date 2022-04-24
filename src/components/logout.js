import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {getFromStorage,deleteFromStorage} from '../utils/storage';

export default class Logout extends Component {

    constructor(props) {
        super(props);
        this.state = { loggedOut: false};
    }

    componentDidMount(){
        try{
            if (getFromStorage('x-auth-token') != null){
                deleteFromStorage('x-auth-token');
                window.location.reload(); 
            }
        }catch{
        }
    }
 
      render() {
        const loggedOut = this.state.loggedOut;

        if (loggedOut){
          return (
            <div class="container-fluid">
              <Redirect to={"/home"}/>
            </div>
              );
        }
        return (
          <div class="container-fluid">
              <Redirect to={"/home"}/>
          </div>
        )
      }
}