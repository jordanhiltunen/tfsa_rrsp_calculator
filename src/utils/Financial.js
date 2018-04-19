import {isInputValid} from "../utils/InputHandling";

function calculateAfterTaxDepositValue(depositAmount, marginalTaxRate, depositTaxable) {

    var afterTaxDepositValue = depositAmount;

    if (depositTaxable) {
        afterTaxDepositValue = (depositAmount * (1 - percentageToDecimal(marginalTaxRate)));
    }

    return afterTaxDepositValue;

}

function calculateFutureAccountValue(principalInvestment, returnOnInvestment, inflationRate, yearsInvested) {

    var realRateOfReturn = calculateRealRateOfReturn(returnOnInvestment, inflationRate);

    // futureValue = presentValue x (1 + rate) ^ periods
    return (principalInvestment * Math.pow((1 + realRateOfReturn), yearsInvested));

}

function calculateTaxPaidUponWithdrawal(accountValue, retirementTaxRate, withdrawTaxable) {

    var withdrawalTax = 0;
    retirementTaxRate = retirementTaxRate || 0;

    if (withdrawTaxable) {
        withdrawalTax = (accountValue * percentageToDecimal(retirementTaxRate));
    }

    return withdrawalTax;

}


function calculateAfterTaxFutureAccountValue(accountValue, taxDeduction) {

    taxDeduction = taxDeduction || 0;

    return (accountValue - taxDeduction);

}

function calculateRealRateOfReturn(nominalRate, inflationRate) {

    // real rate of return = ((1 + NominalRate)/(1 + InflationRate)) - 1

    nominalRate   = nominalRate || 0;
    inflationRate = inflationRate || 0;

    var realRateOfReturn = ((1 + percentageToDecimal(nominalRate))/(1 + percentageToDecimal(inflationRate))) - 1;
    return realRateOfReturn;

}

function percentageToDecimal(percentage) {

    // user input representing percentages is captured in the format 0..100+;
    // for calculations, we convert to a decimal representation
    return percentage / 100;

}

function estimateIncomeByTaxRate(taxRate) {

    // combined Federal & British Columbia Tax Brackets (2018)
    // https://www.taxtips.ca/taxrates/bc.htm

    var taxBracket = "unknown";

    const taxBrackets = [
        [0.0, "0 - $39,676"],
        [20.06, "0 - $39,676"],
        [22.70, "$39,677 - $46,605"],
        [28.20, "$46,606 - $79,353"],
        [31.00, "$79,354 - $91,107"],
        [32.79, "$91,108 - to $93,208"],
        [38.29, "$93,209 - $110,630"],
        [40.70, "$110,631 - $144,489"],
        [43.70, "$144,490 - $150,000"],
        [45.80, "$150,001 - $205,842"],
        [49.80, "$205,843+"],
        [100.0, "$205,843+"]
    ];


    if (isInputValid(taxRate)) {

        var i; // https://stackoverflow.com/questions/31120478/uncaught-referenceerror-i-is-not-defined
        for (i = 0; i < taxBrackets.length-1; i++) {

            if (inRange(taxRate, taxBrackets[i][0], taxBrackets[i+1][0])) {
                taxBracket = taxBrackets[i][1];
                break;
            } else { taxBracket = "uknown"; }

        }

    }

    return taxBracket;

}

function inRange(queryInt, min, max) {
    return ((queryInt-min)*(queryInt-max) <= 0);
}

export { calculateAfterTaxDepositValue };
export { calculateFutureAccountValue };
export { calculateTaxPaidUponWithdrawal };
export { calculateRealRateOfReturn };
export { calculateAfterTaxFutureAccountValue };
export { estimateIncomeByTaxRate }
export { percentageToDecimal }