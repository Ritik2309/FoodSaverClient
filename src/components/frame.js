import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import checkLogin from "../utils/checkLogin";
import Login from "./login";

function getTodaysDate(){ 
  var today = new Date();
  let month = String(today.getMonth() + 1);
  let day = String(today.getDate());
  const year = String(today.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${year}-${month}-${day}`;
}

export default class Frame extends Component {
  constructor(props) {
    super(props);
    this.pageText = "Food saver";

    this.refresh = this.refresh.bind(this);

    this.state = {loggedIn: false};
    } 

    componentDidMount() {
      let token = checkLogin();
  
      if (!(token == null)) {
        this.setState({ loggedIn: true });
      }
    }

    refresh(){
      setTimeout(function(){
        window.location.reload(); //to refresh page
      });
    }

    render() {
    const loggedIn = this.state.loggedIn;
    const currentDate = getTodaysDate();

        return (
          
          <div class="container-fluid" id="app-frame">
          
          <h2 class="font-weight-bold">{this.pageText}

          {!(loggedIn) &&
          <>
            <Login buttonText={"Login"}/>

            <Link to="/signup">
            <button type="button" class="mx-1 btn btn-secondary float-right">Sign Up</button>
            </Link>
          </>
          }
          </h2>
          <br />
          <h1 class="pl-5 font-weight-bold"> {this.headingText}
          
          {(loggedIn === true) &&
          <Link to="/logout">
          <button onClick={this.refresh} type="button" class="mx-1 btn btn-secondary float-right">Logout</button>
          </Link>
          }

          {(loggedIn === true) &&
          <Link to="/settings">
          <button type="button" class="mx-1 btn btn-secondary float-right">Settings</button>
          </Link>
          }
          {(loggedIn !== true) &&
          <Login buttonText={"Settings"} />
          }

          <Link to="/bmi">
          <button type="button" class="mx-1 btn btn-secondary float-right">BMI Calculator</button>
          </Link>

          {(loggedIn === true) &&
          <Link to={{
            pathname: "/tracker",
            state: currentDate,
              }}>
          <button type="button" class="mx-1 btn btn-secondary float-right">Meal Tracker</button>
          </Link>
          }
          {(loggedIn !== true) &&
          <Login buttonText={"Meal Tracker"} />
          }

          <Link to="/recipes">
          <button type="button" class="mx-1 btn btn-secondary float-right">Recipes</button>
          </Link>

          {(loggedIn === true) &&
          <Link to="/fridge">
          <button type="button" class="mx-1 btn btn-secondary float-right">My Fridge</button>
          </Link>
          }
          {(loggedIn !== true) &&
          <Login buttonText={"My Fridge"} />
          }

          {(loggedIn === true) &&
          <Link to="/shoppingPlanning">
          <button type="button" class="mx-1 btn btn-secondary float-right">Shopping List</button>
          </Link>
          }
          {(loggedIn !== true) &&
          <Login buttonText={"Shopping Planning"} />
          }

          {(loggedIn === true) &&
          <Link to="/social">
          <button type="button" class="mx-1 btn btn-secondary float-right">Social Sharing</button>
          </Link>
          }
          {(loggedIn !== true) &&
          <Login buttonText={"Social Sharing"} />
          }

          <Link to="/home">
          <button type="button" class="mx-1 btn btn-secondary float-right">Home</button>
          </Link>

          </h1>

          <br/>
      </div>
    );
  }
}