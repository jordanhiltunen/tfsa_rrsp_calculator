import {calculateAfterTaxDepositValue} from "./Financial";
import {calculateFutureAccountValue} from "./Financial";
import {calculateTaxPaidUponWithdrawal} from "./Financial";
import {calculateAfterTaxFutureAccountValue} from "./Financial";

class GenericAccount {

    constructor(depositAmount) {

        this._depositAmount   = depositAmount;

    }

    // ----------------------------
    // SETTERS
    // ----------------------------

    // taxation characteristics
    set depositTaxable(depositTaxable)         { this._depositTaxable = depositTaxable; }
    set withdrawTaxable(withdrawTaxable)       { this._withdrawTaxable = withdrawTaxable; }

    // investment scenario
    set marginalTaxRate(marginalTaxRate)                   { this._marginalTaxRate = marginalTaxRate; }
    set averageRetirementTaxRate(averageRetirementTaxRate) { this._averageRetirementTaxRate = averageRetirementTaxRate; }
    set yearsInvested(yearsInvested)                       { this._yearsInvested = yearsInvested; }
    set inflationRate(inflationRate)                       { this._inflationRate = inflationRate; }
    set returnOnInvestment(returnOnInvestment)             { this._returnOnInvestment = returnOnInvestment; }

    // ----------------------------
    // INVESTMENT OUTCOMES
    // ----------------------------

    calculateInvestmentPerformance() {

        this._afterTaxDeposit            = calculateAfterTaxDepositValue(this._depositAmount, this._marginalTaxRate, this._depositTaxable);
        this._futureAccountValue         = calculateFutureAccountValue(this._afterTaxDeposit, this._returnOnInvestment, this._inflationRate, this._yearsInvested);
        this._taxPaidUponWithdrawal      = calculateTaxPaidUponWithdrawal(this._futureAccountValue, this._averageRetirementTaxRate, this._withdrawTaxable);
        this._afterTaxFutureAccountValue = calculateAfterTaxFutureAccountValue(this._futureAccountValue, this._taxPaidUponWithdrawal);

    }

    // ----------------------------
    // GETTERS
    // ----------------------------

    get afterTaxDeposit()            { return this._afterTaxDeposit; }
    get futureAccountValue()         { return this._futureAccountValue; }
    get taxPaidUponWithdrawal()      { return this._taxPaidUponWithdrawal; }
    get afterTaxFutureAccountValue() { return this._afterTaxFutureAccountValue; }

}

export default GenericAccount;