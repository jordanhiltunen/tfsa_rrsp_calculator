import React, { Component } from 'react';

import './App.css';

import ProgressBar from "./components/ProgressBar";
import GenericTextInput from "./components/GenericTextInput";
import InvestmentReport from "./components/InvestmentReport";
import {handleInteger, handlePercentage, handleDollar, isInputValid} from "./utils/InputHandling";
import InputCommentary from "./components/InputCommentary";



class App extends Component {

    constructor(props) {
        super(props);

        this.state = {

            // inputs
            inputs: {
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

        var progressIncrement;

        var previousValue = this.state.inputs[target.name];

        var previousValueValidity = isInputValid(previousValue);
        var currentValueValidity  = isInputValid(numericValue);

        if (!previousValueValidity && currentValueValidity) {
            // if the previous input was invalid or empty, and now it is acceptable,
            // we have one more completed input.
            progressIncrement = 1;
        } else if (previousValueValidity && !currentValueValidity) {
            // ... conversely, the opposite implies that one input has gone bad
            progressIncrement = -1;
        } else {
            progressIncrement = 0;
        }

        var progressCount = this.state.progressCount + progressIncrement;

        return progressCount;

    }

    calculateInputCount() {
        return Object.keys(this.state.inputs).length;
    }

    handleInputChange(event, numericValue) {

        const target = event.target;

        var inputs = Object.assign({}, this.state.inputs, {[target.name]: numericValue});
        // Commentary on Object.assign vs other strategies for addressing nested objects in React's state:
        // https://stackoverflow.com/questions/29537299/react-how-do-i-update-state-item1-on-setstate-with-jsfiddle
        // This toy app is simple enough that nested objects aren't really needed, but I preferred
        // to encapsulate the values of all inputs within one object for cleaner prop-passing,
        // and also so that I could easily calculate the element count of inputs,
        // which I use in calculating progress - I did not want to use a constant defining
        // the number of inputs for this.

        this.setState({
            inputs: inputs,
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
                  <h2 className="text-center">Investment Scenario</h2>
                  <br/>



                  <div className="row investment-input-row">

                      <div className="col-md-4">
                          <label htmlFor="depositAmount" className="input-label">Amount of Deposit</label>
                          <GenericTextInput name="depositAmount"
                                            onChange={this.handleInputChange}
                                            handleInput={handleDollar}
                                            inputAddonPrependChar="$"/>

                      </div>

                      <div className="col-md-4">
                          <label htmlFor="marginalTaxRate" className="input-label">Current Marginal Tax Rate</label>
                          <GenericTextInput name="marginalTaxRate"
                                            onChange={this.handleInputChange}
                                            handleInput={handlePercentage}
                                            valueCeiling={100}
                                            inputAddonAppendChar="%"/>

                      </div>

                      <div className="col-md-4">
                          <label htmlFor="averageRetirementTaxRate" className="input-label">Average Retirement Tax Rate</label>
                          <GenericTextInput name="averageRetirementTaxRate"
                                            onChange={this.handleInputChange}
                                            handleInput={handlePercentage}
                                            valueCeiling={100}
                                            inputAddonAppendChar="%"/>

                      </div>


                  </div>



                  <div className="row investment-input-row">

                      <div className="col-md-4">
                          <label htmlFor="yearsInvested" className="input-label">Years Invested</label>
                          <GenericTextInput name="yearsInvested"
                                            onChange={this.handleInputChange}
                                            handleInput={handleInteger}/>

                      </div>

                      <div className="col-md-4">
                          <label htmlFor="inflationRate" className="input-label">Inflation Rate</label>
                          <GenericTextInput name="inflationRate"
                                            onChange={this.handleInputChange}
                                            handleInput={handlePercentage}
                                            inputAddonAppendChar="%"/>


                      </div>

                      <div className="col-md-4">
                          <label htmlFor="returnOnInvestment" className="input-label">Return on Investment (% Annual Growth)</label>
                          <GenericTextInput name="returnOnInvestment"
                                            onChange={this.handleInputChange}
                                            handleInput={handlePercentage}
                                            inputAddonAppendChar="%"/>

                      </div>


                  </div>


              </div>

              <InputCommentary inputs={this.state.inputs}/>


              <InvestmentReport inputs={this.state.inputs}
                                progressCount={this.state.progressCount}
                                inputCount={this.calculateInputCount()}/>


          </div>



      </div>
    );
  }
}

export default App;
