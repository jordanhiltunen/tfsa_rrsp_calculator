import React from "react";
import {handleDollar, handleInteger, handlePercentage} from "../utils/InputHandling";
import GenericTextInput from "../components/GenericTextInput";

class InvestmentScenarioForm extends React.Component {


    render() {

        return (
        <div>

            <div className="row investment-input-row">

                <div className="col-md-4">
                    <label htmlFor="depositAmount" className="input-label">Amount of Deposit</label>
                    <GenericTextInput name="depositAmount"
                                      stringValue={this.props.stringInputValues.depositAmount}
                                      numericValue={this.props.numericInputValues.depositAmount}
                                      handleInputChange={this.props.handleInputChange}
                                      handleInput={handleDollar}
                                      inputAddonPrependChar="$"/>

                </div>

                <div className="col-md-4">
                    <label htmlFor="marginalTaxRate" className="input-label">Current Marginal Tax Rate</label>
                    <GenericTextInput name="marginalTaxRate"
                                      stringValue={this.props.stringInputValues.marginalTaxRate}
                                      numericValue={this.props.numericInputValues.marginalTaxRate}
                                      handleInputChange={this.props.handleInputChange}
                                      handleInput={handlePercentage}
                                      valueCeiling={100}
                                      inputAddonAppendChar="%"/>

                </div>

                <div className="col-md-4">
                    <label htmlFor="averageRetirementTaxRate" className="input-label">Average Retirement Tax Rate</label>
                    <GenericTextInput name="averageRetirementTaxRate"
                                      stringValue={this.props.stringInputValues.averageRetirementTaxRate}
                                      numericValue={this.props.numericInputValues.averageRetirementTaxRate}
                                      handleInputChange={this.props.handleInputChange}
                                      handleInput={handlePercentage}
                                      valueCeiling={100}
                                      inputAddonAppendChar="%"/>

                </div>


            </div>



            <div className="row investment-input-row">

                <div className="col-md-4">
                    <label htmlFor="yearsInvested" className="input-label">Years Invested</label>
                    <GenericTextInput name="yearsInvested"
                                      stringValue={this.props.stringInputValues.yearsInvested}
                                      numericValue={this.props.numericInputValues.yearsInvested}
                                      handleInputChange={this.props.handleInputChange}
                                      handleInput={handleInteger}/>

                </div>

                <div className="col-md-4">
                    <label htmlFor="inflationRate" className="input-label">Inflation Rate</label>
                    <GenericTextInput name="inflationRate"
                                      stringValue={this.props.stringInputValues.inflationRate}
                                      numericValue={this.props.numericInputValues.inflationRate}
                                      handleInputChange={this.props.handleInputChange}
                                      handleInput={handlePercentage}
                                      inputAddonAppendChar="%"/>


                </div>

                <div className="col-md-4">
                    <label htmlFor="returnOnInvestment" className="input-label">Return on Investment (% Annual Growth)</label>
                    <GenericTextInput name="returnOnInvestment"
                                      stringValue={this.props.stringInputValues.returnOnInvestment}
                                      numericValue={this.props.numericInputValues.returnOnInvestment}
                                      handleInputChange={this.props.handleInputChange}
                                      handleInput={handlePercentage}
                                      inputAddonAppendChar="%"/>

                </div>


            </div>

        </div>

        );
    }
}

export default InvestmentScenarioForm;