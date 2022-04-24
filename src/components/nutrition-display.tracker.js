import React, { Component } from 'react';

function getTodaysCalories(foodsEaten){
  var calorieTotal = 0;

  foodsEaten.forEach(function(food) {
    if (food.nutrients.calories !== undefined){
      calorieTotal += parseInt(food.nutrients.calories.slice(0, -2));
    }
  });

  return calorieTotal;
}

function getTodaysCarbs(foodsEaten){
  var carbTotal = 0;

  foodsEaten.forEach(function(food) {
    if (food.nutrients.carbohydrateContent !== undefined){
      carbTotal += parseInt(food.nutrients.carbohydrateContent.slice(0, -1));
    }
  });

  return carbTotal;
}

function getTodaysFat(foodsEaten){
  var fatTotal = 0;

  foodsEaten.forEach(function(food) {
    if (food.nutrients.fatContent !== undefined){
      fatTotal += parseInt(food.nutrients.fatContent.slice(0, -1));
    }
  });

  return fatTotal;
}

function getTodaysFiber(foodsEaten){
  var fiberTotal = 0;

  foodsEaten.forEach(function(food) {
    if (food.nutrients.fiberContent !== undefined){
      fiberTotal += parseInt(food.nutrients.fiberContent.slice(0, -1));
    }
  });

  return fiberTotal;
}

function getTodaysProtein(foodsEaten){
  var proteinTotal = 0;

  foodsEaten.forEach(function(food) {
    if (food.nutrients.proteinContent !== undefined){
      proteinTotal += parseInt(food.nutrients.proteinContent.slice(0, -1));
    }
  });

  return proteinTotal;
}

function getTodaysSatFat(foodsEaten){
  var satfatTotal = 0;

  foodsEaten.forEach(function(food) {
    if (food.nutrients.saturatedFatContent !== undefined){
      satfatTotal += parseInt(food.nutrients.saturatedFatContent.slice(0, -1));
    }
  });

  return satfatTotal;
}

export default class NutritionInfo extends Component {
  render() {
    const foodsEaten = this.props.foodsEaten;
    const todaysCalories = getTodaysCalories(foodsEaten);
    const todaysCarbs = getTodaysCarbs(foodsEaten);
    const todaysFats = getTodaysFat(foodsEaten);
    const todaysFiber = getTodaysFiber(foodsEaten);
    const todaysProtein = getTodaysProtein(foodsEaten);
    const todaysSatFat = getTodaysSatFat(foodsEaten);

    return (
        <div class="container-fluid">
          <dl class="list-group">
            <div class="row">
                <div class="col">
                  <dt class="list-group-item h2">Calories</dt>
                  <dd class="list-group-item h3" style={{ color: 'red' }}>{todaysCalories} kcal</dd>
                </ div>
                <div class="col">
                  <dt class="list-group-item h2">Carbs</dt>
                  <dd class="list-group-item h3" style={{ color: 'orange' }}>{todaysCarbs}g</dd>
                </ div>
                <div class="col">
                  <dt class="list-group-item h2">Fats</dt>
                  <dd class="list-group-item h3" style={{ color: 'yellow' }}>{todaysFats}g</dd>
                </ div>
                <div class="col">
                  <dt class="list-group-item h2">Fiber</dt>
                  <dd class="list-group-item h3" style={{ color: 'green' }}>{todaysFiber}g</dd>
                </ div>
                <div class="col">
                  <dt class="list-group-item h2">Protien</dt>
                  <dd class="list-group-item h3" style={{ color: 'cyan' }}>{todaysProtein}g</dd>
                </ div>
                <div class="col">
                  <dt class="list-group-item h3">Saturated</dt>
                  <dd class="list-group-item h3" style={{ color: 'blue' }}>{todaysSatFat}g</dd>
                </ div>
            </ div>
          </ dl>
        </div>
    );
  }
}