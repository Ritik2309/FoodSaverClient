import React, { Component } from 'react';
import styles from "./styling.module.css";
import $ from 'jquery'; 
import {integerCheck} from "../utils/validation";

export default class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = {setting: "metric"
                    , measurement1: "Weight in kilograms (kg):"
                    , measurement2: "Height in metres (m):"
                    , bmi: undefined
                    , weight: ""
                    , height: ""
                    };

        this.switchToImperial = this.switchToImperial.bind(this);
        this.switchToMetric = this.switchToMetric.bind(this);

        this.calculateBMI = this.calculateBMI.bind(this);
    }

    handleWeightChange(event) {
        this.setState({weight: event.target.value})
      }

    handleHeightChange(event) {
        this.setState({height: event.target.value})
    }

    switchToImperial(){
        this.setState({
          setting: "imperial"
        , measurement1: "Weight in pounds (lbs):"
        , measurement2: "Height in inches (12 inches per foot):"
        });
    }

    switchToMetric(){
        this.setState({
          setting: "metric"
        , measurement1: "Weight in kilograms (kg):"
        , measurement2: "Height in metres (m):"
        });
    }

    calculateBMI(){
        $('#alert-placeholder').html("");
        
        if ((integerCheck(this.state.weight))&&(integerCheck(this.state.weight))){
            if (this.state.setting === "metric"){
                const bmi = ((this.state.weight)/(Math.pow(this.state.height, 2))).toFixed(1);
                this.setState({bmi: bmi});
            }else if(this.state.setting === "imperial"){
                const bmi = ((this.state.weight/2.2)/(Math.pow((this.state.height/39.37), 2))).toFixed(1);
                this.setState({bmi: bmi});
            }
        }else{
            $('#alert-placeholder').html("<div class='alert alert-danger' role='alert'>"
            + "Weight and height must be integer values!</div>");
        }
    }

    render() {
        return (
        <div class="bg-secondary rounded">
            <div class="row">
                <div class="col-6">
                    <button onClick={this.switchToMetric} type="button" class="btn btn-dark btn-block">Metric</button>
                </div>
                <div class="col-6">
                    <button onClick={this.switchToImperial} type="button" class="btn btn-dark btn-block">Imperial</button>
                </div>
            </div>

            <br/>
            <br/>
            <br/>

            <div class="row">
                <div class="col-6">
                <button type="button" class="btn btn-dark btn-block" disabled>{this.state.measurement1}</button>
                </div>
                <div class="col-6">
                    <input type="text" class="form-control"
                    value={this.state.weight} onChange={this.handleWeightChange.bind(this)}/>
                </div>
            </div>

            <br/>

            <div class="row">
                <div class="col-6">
                <button type="button" class="btn btn-dark btn-block" disabled>{this.state.measurement2}</button>
                </div>
                <div class="col-6">
                    <input type="text" class="form-control"
                    value={this.state.height} onChange={this.handleHeightChange.bind(this)}/>
                </div>
            </div>

            <br/>
            <br/>
            <br/>
            <br/>

            <div class="row">
                <div class="col-12">
                    <button onClick={this.calculateBMI} type="button" class="btn btn-dark btn-block">Get BMI</button>
                </div>
            </div>

            <br/>

            <div id='alert-placeholder'/>
            
            {((this.state.bmi !== undefined)&&(this.state.bmi < 18.5)) &&
            <div class="bg-danger rounded-top">
                <br/>
                <h2 className={styles.alignCentre}><strong>Your BMI is {this.state.bmi}.</strong></h2>
                <br/>
            </div>
            }
            {((this.state.bmi !== undefined)&&((this.state.bmi > 18.5)&&(this.state.bmi < 24.9))) &&
            <div class="bg-success rounded-top">
                <br/>
                <h2 className={styles.alignCentre}><strong>Your BMI is {this.state.bmi}.</strong></h2>
                <br/>
            </div>
            }
            {((this.state.bmi !== undefined)&&((this.state.bmi > 25.0)&&(this.state.bmi < 29.9))) &&
            <div class="bg-warning rounded-top">
                <br/>
                <h2 className={styles.alignCentre}><strong>Your BMI is {this.state.bmi}.</strong></h2>
                <br/>
            </div>
            }
            {((this.state.bmi !== undefined)&&(this.state.bmi > 30.0)) &&
            <div class="bg-danger rounded-top">
                <br/>
                <h2 className={styles.alignCentre}><strong>Your BMI is {this.state.bmi}.</strong></h2>
                <br/>
            </div>
            }

        </div>
        ); 
    }
}