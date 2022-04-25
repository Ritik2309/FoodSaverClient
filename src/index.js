import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

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
