import React, { Component } from 'react';
import Calculator from './calculator.bmi';

export default class BMI extends Component {
  render() {
    return (
        <div class="container-fluid">
          <br />
          <h3>Welcome to our BMI Calculator.</h3>
          <p class="text-muted float-left">This calculator is for ages 18+ only, it's otherwise inaccurate.</p>
          <br />
          <br />

          <Calculator/>

          <br />
          <h3>Interpreting your BMI</h3>
          <br />

          <p>For both men and women BMI number can be interpreted using the same chart:</p>

          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">BMI</th>
                <th scope="col">Weight status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Below 18.5</th>
                <td>Underweight</td>
              </tr>
              <tr>
                <th scope="row">18.5 – 24.9</th>
                <td>Normal or Healthy Weight</td>
              </tr>
              <tr>
                <th scope="row">25.0 – 29.9</th>
                <td>Overweight</td>
              </tr>
              <tr>
                <th scope="row">30.0 and Above</th>
                <td>Obese</td>
              </tr>
            </tbody>
          </table>

          <br/>

          <h3>Don't agree with your results?</h3>

          <br/>

          <p>Although BMI is accurate for the majority of the population, we must consider that excess weight
          may be as a result of muscle mass as opposed to fat mass. This is typically the case for athletes, they may come
          out with the result obese when they are sitting at a perfect level of body fat, for instance. The results
          of this calculator should be taken as a rough guide only, if you want to properly assess your health you should
          contact a professional.
          </p>

        </div>
      ); 
  }
}