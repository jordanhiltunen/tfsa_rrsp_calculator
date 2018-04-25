import React, { Component } from 'react';

import './App.css';

import ProgressBar from "./components/ProgressBar";
import InvestmentScenarioForm from "./components/InvestmentScenarioForm";
import InputCommentary from "./components/InputCommentary";
import InvestmentReport from "./components/InvestmentReport";
import {isInputValid} from "./utils/InputHandling";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {

            // decorated string representations of user input
            stringInputValues: {
                depositAmount: '',
                marginalTaxRate: '',
                averageRetirementTaxRate: '',
                yearsInvested: '',
                inflationRate: '',
                returnOnInvestment: '',
            },

            // numeric representations of user input
            numericInputValues: {
                depositAmount: null,
                marginalTaxRate: null,
                averageRetirementTaxRate: null,
                yearsInvested: null,
                inflationRate: null,
                returnOnInvestment: null,
            },

            // progress
            progressCount: 0,
        };

        // binds
        this.handleInputChange      = this.handleInputChange.bind(this);
        this.calculateProgressCount = this.calculateProgressCount.bind(this);
        this.calculateInputCount    = this.calculateInputCount.bind(this);
    }


    calculateProgressCount(target, numericValue) {

        let progressIncrement;

        const previousValue = this.state.numericInputValues[target.name];

        const previousValueValidity = isInputValid(previousValue);
        const currentValueValidity  = isInputValid(numericValue);

        if (!previousValueValidity && currentValueValidity) {
            // if the previous input was invalid or empty, and now it is acceptable,
            // we have one more completed input, so we will increment our count by one.
            progressIncrement = 1;
        } else if (previousValueValidity && !currentValueValidity) {
            // ... conversely, the opposite implies that one input has gone bad,
            // and we will decrement our progress count by one
            progressIncrement = -1;
        } else {
            // nothing has happened.
            progressIncrement = 0;
        }

        return this.state.progressCount + progressIncrement;

    }

    calculateInputCount() {
        return Object.keys(this.state.numericInputValues).length;
    }

    handleInputChange(event, stringValue, numericValue) {

        const target = event.target;

        const stringInputValues  = Object.assign({}, this.state.stringInputValues, {[target.name]: stringValue});
        const numericInputValues = Object.assign({}, this.state.numericInputValues, {[target.name]: numericValue});
        // Commentary on Object.assign vs other strategies for addressing nested objects in React's state:
        // https://stackoverflow.com/questions/29537299/react-how-do-i-update-state-item1-on-setstate-with-jsfiddle
        // This toy app is simple enough that nested objects aren't really needed, but I preferred
        // to encapsulate the values of all inputs within one object for cleaner prop-passing,
        // and also so that I could easily calculate the element count of inputs,
        // which I use in calculating progress - I did not want to use a constant defining
        // the number of inputs for this.

        this.setState({
            stringInputValues: stringInputValues,
            numericInputValues: numericInputValues,
            progressCount: this.calculateProgressCount(target, numericValue)
        });

    }


  render() {
    return (

      <div className="App">
        <header className="App-header">

            <h1 className="App-title">
                <strong>TFSA & RRSP</strong> Comparison Calculator<br/>
                <small>Jordan Hiltunen</small>
            </h1>

        </header>



          <div className="main-app-body">


              <div className="progress-section">

                  <div className="container">
                      <ProgressBar progressCount={this.state.progressCount}
                                  inputCount={this.calculateInputCount()}/>
                  </div>

              </div>


              <div className="container input-container">
                  <h2 className="text-center investment-form-header">Investment Scenario</h2>


                  <InvestmentScenarioForm
                        stringInputValues={this.state.stringInputValues}
                        numericInputValues={this.state.numericInputValues}
                        handleInputChange={this.handleInputChange}/>

              </div>


              <InputCommentary inputs={this.state.numericInputValues}/>

              <InvestmentReport inputs={this.state.numericInputValues}
                                progressCount={this.state.progressCount}
                                inputCount={this.calculateInputCount()}/>


          </div>



      </div>
    );
  }
}

export default App;
