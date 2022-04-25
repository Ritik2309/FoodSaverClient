import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import { BrowserRouter as Router, Route } from "react-router-dom";


import Home from "./components/home";
import Fridge from "./components/fridge";
import BMI from "./components/bmi";
import MealTracker from "./components/meal-tracker";
import Recipes from "./components/recipes";
import RecipeSearch from "./components/recipe-search";
import ImageSearch from "./components/image-search";
import RecipeGuide from "./components/recipe-guide";
import Social from "./components/social";
import shoppingPlan from "./components/shoppingPlanning";
import Login from "./components/login";
import Signup from "./components/signup";
import Logout from "./components/logout";
import Settings from "./components/settings";

ReactDOM.render(
  <React.StrictMode>
    
    <App />

<Router>

<Route path="/home" component={Home}/>
<Route path="/fridge" component={Fridge}/>
<Route path="/tracker" component={MealTracker}/>
<Route path="/recipes" component={Recipes}/>
<Route path="/recipe_guide" component={RecipeGuide}/>
<Route path="/search" component={RecipeSearch}/>
<Route path="/searchImage" component={ImageSearch}/>
<Route path="/bmi" component={BMI}/>
<Route path="/social" component={Social}/>
<Route path="/shoppingPlanning"  component={shoppingPlan}/>
<Route path="/login" component={Login}/>
<Route path="/signup" component={Signup}/>
<Route path="/logout" component={Logout}/>
<Route path="/settings" component={Settings}/>

</Router>

  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
