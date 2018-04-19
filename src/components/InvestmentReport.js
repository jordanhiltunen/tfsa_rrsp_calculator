import React from "react";
import GenericAccount from '../utils/GenericAccount';
import {decorateDollarValue} from "../utils/ReportDecoration";

class InvestmentReport extends React.Component {

    constructor() {
        super();

        this.prepareRRSP              = this.prepareRRSP.bind(this);
        this.prepareTFSA              = this.prepareTFSA.bind(this);

    }

    injectInvestmentScenario(account) {

        account.marginalTaxRate          = this.props.inputs.marginalTaxRate;
        account.averageRetirementTaxRate = this.props.inputs.averageRetirementTaxRate;
        account.yearsInvested            = this.props.inputs.yearsInvested;
        account.inflationRate            = this.props.inputs.inflationRate;
        account.returnOnInvestment       = this.props.inputs.returnOnInvestment;

        account.calculateInvestmentPerformance();

        return account;

    }

    prepareTFSA() {
        let account = new GenericAccount(this.props.inputs.depositAmount);
        account.depositTaxable = true;
        account.withdrawTaxable = false;

        this.injectInvestmentScenario(account);

        return account;
    }

    prepareRRSP() {
        let account = new GenericAccount(this.props.inputs.depositAmount);
        account.depositTaxable = false;
        account.withdrawTaxable = true;

        this.injectInvestmentScenario(account);

        return account;
    }


    render () {

        const TFSA = this.prepareTFSA();
        const RRSP = this.prepareRRSP();

        return (
            <div className="container investment-report-container">

                <div className="row">

                    <div className="col-md-6">
                        <h3 className="text-center">Registered Retirement Savings Plan (RRSP)</h3>
                    </div>

                    <div className="col-md-6">
                        <h3 className="text-center">Tax-Free Savings Account (TFSA)</h3>
                    </div>
                </div>


                <br/>
                <span className="report-outcome-name">After-Tax Deposit</span><br/>
                <p className="report-outcome-description">
                    Contributions made to RRSPs are 'pre-tax' - they entitle you to a tax deduction,
                    in essence allowing you to contribute a portion of your income without paying
                    income tax (that tax is deferred until you withdraw your funds in the future).
                    In comparison, contributions made to TFSAs are 'after-tax' - funds that you
                    contribute to your TFSA have already been subject to income tax (according to
                    your current marginal tax rate). For this reason, to sensibly compare the two
                    account types, we base our calculations on the same initial deposit amount but
                    adjust the amount of funds added to each account to reflect their respective
                    contribution tax implications (no tax on RRSPs, tax on TFSAs).

                </p>

                <div className="row report-outcome-row">

                    <div className="col-md-6 report-outcome-value">
                        {decorateDollarValue(RRSP.afterTaxDeposit())}
                    </div>

                    <div className="col-md-6 report-outcome-value">
                        {decorateDollarValue(TFSA.afterTaxDeposit())}
                    </div>
                </div>

                <br/>
                <span className="report-outcome-name">Future Value</span>
                <p className="report-outcome-description">
                    The value of your accounts in the future, taking into consideration
                    your original amounts, your expected rate of return, a hypothetical inflation rate,
                    and your chosen investment period.
                </p>

                <div className="row report-outcome-row">
                    <div className="col-md-6 report-outcome-value">
                        {decorateDollarValue(RRSP.futureAccountValue())}
                    </div>

                    <div className="col-md-6 report-outcome-value">
                        {decorateDollarValue(TFSA.futureAccountValue())}
                    </div>
                </div>


                <br/>
                <span className="report-outcome-name">Tax Paid Upon Withdrawal</span><br/>
                <p className="report-outcome-description">
                    Withdrawals from TFSAs are tax-free, whereas withdrawals from RRSPs are taxed at
                    your marginal tax rate (determined by your annual income at the time of
                    your withdrawal).
                </p>

                <div className="row report-outcome-row">

                    <div className="col-md-6 report-outcome-value">
                        {decorateDollarValue(RRSP.taxPaidUponWithdrawal())}
                    </div>

                    <div className="col-md-6 report-outcome-value">
                        {decorateDollarValue(TFSA.taxPaidUponWithdrawal(), true)}
                    </div>
                </div>

                <br/>
                <span className="report-outcome-name">After-Tax Future Value</span>
                <p className="report-outcome-description">
                    The future value of your investments (minus your tax withdrawal obligations),
                    if you were to withdraw the entire balance from both accounts at once at the
                    conclusion of your chosen investment period.
                </p>


                <div className="row report-outcome-row">
                    <div className="col-md-6 report-outcome-value">
                        {decorateDollarValue(RRSP.afterTaxFutureAccountValue())}
                    </div>

                    <div className="col-md-6 report-outcome-value">
                        {decorateDollarValue(TFSA.afterTaxFutureAccountValue())}
                    </div>
                </div>


            </div>
        )
    }
}

export default InvestmentReport;