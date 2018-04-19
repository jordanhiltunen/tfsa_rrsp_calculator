import React from "react";
import {isInputValid} from "../utils/InputHandling";
import {estimateIncomeByTaxRate} from "../utils/Financial";

class InputCommentary extends React.Component {


    commentOnMarginalTaxRate() {

        var estimatedTaxBracket = estimateIncomeByTaxRate(this.props.inputs.marginalTaxRate);

        if (isInputValid(this.props.inputs.marginalTaxRate)) {
            return <span>
                <span className="note-valid">Marginal Tax Rate: </span>
                Your marginal tax rate (<span className="note-dark">{this.props.inputs.marginalTaxRate}%</span>)
                implies a current annual income in the range of <span className="note-dark">{estimatedTaxBracket}</span>.
                </span>

        } else {
            return <span>
                <span className="note-warning">Marginal Tax Rate: </span>
                Without a current marginal tax rate, the relative value of your TFSA
                contributions will be overestimated.
            </span>
        }

    }

    commentOnRetirementTaxRate() {

        var estimatedTaxBracket = estimateIncomeByTaxRate(this.props.inputs.averageRetirementTaxRate);

        if (isInputValid(this.props.inputs.averageRetirementTaxRate)) {
            return <span>
                <span className="note-valid">Average Retirement Tax Rate: </span>
                Your average retirement tax rate (<span className="note-dark">{this.props.inputs.averageRetirementTaxRate}%</span>)
                implies an annual retirement income in the range of <span className="note-dark">{estimatedTaxBracket}</span>.
                </span>
        } else {
            return <span>
                <span className="note-warning">Average Retirement Tax Rate: </span>
                Without an average retirement tax rate, your results will not include an
                estimate of the amount of taxes that you will need to pay when you withdraw funds from your RRSP.
                While TFSA withdraws are tax-free, RRSP withdraws are taxed according to your marginal tax rate
                at the time of your future withdrawal.
            </span>
        }

    }

    commentOnInflationRate() {

        if (isInputValid(this.props.inputs.inflationRate)) {
            return <span>
                <span className="note-valid">Inflation Rate: </span>
                The inflation rate (<span className="note-dark">{this.props.inputs.inflationRate}%</span>) is used to calculate
                your real rate of return.
            </span>
        } else {
            return <span>
                <span className="note-warning">Inflation Rate: </span>
                Without an inflation rate, the future value of your investments will be represented in today's dollars,
                and will therefore likely be exaggerated; under inflation, the value of a dollar decreases over time.
                When an inflation rate is present, this calculator will use an estimated real rate of
                return incorporating both your expected return on investment and the inflation rate in its
                estimation of your future account values. Recently, Canada's inflation rate has been around 2.2%.
            </span>
        }

    }

    commentOnReturnOnInvestment() {

        if (isInputValid(this.props.inputs.returnOnInvestment)) {
            return <span>
                <span className="note-valid">Return on Investment: </span>
                Your future account values are estimated assuming an annual return rate of&nbsp;
                <span className="note-dark">{this.props.inputs.returnOnInvestment}%</span> (your nominal rate of return,
                excluding the effect of inflation on the value of your investments).
            </span>
        } else {
            return <span>
                 <span className="note-warning">Return on Investment: </span>
                Without a specified return on investment (the percentage that you expect your
                investment to grow every year), this calculator will effectively treat your deposit
                as cash, sitting uninvested in your accounts. For reference, 7.5% is a reasonable
                approximation of average annual market performance (however, most investors&nbsp;
                <a href="https://www.cnbc.com/2017/01/04/most-investors-didnt-come-close-to-beating-the-sp-500.html"
                   target="_blank" rel="noopener noreferrer" className="app-link">
                    do not enjoy this level of returns
                </a>).
            </span>
        }


    }





    render () {


        return (
            <div className="container input-commentary-container panel">

                <ul className="notes">
                    <li>{this.commentOnMarginalTaxRate()}</li>
                    <li>{this.commentOnRetirementTaxRate()}</li>
                    <li>{this.commentOnInflationRate()}</li>
                    <li>{this.commentOnReturnOnInvestment()}</li>
                </ul>

            </div>
        )


    }

}


export default InputCommentary;