import {addThousandsSeparator} from "./ReportDecoration";

function handleDollar(dollarInput) {

    // preliminary cleaning (non-numeric characters, leading zeroes)
    dollarInput = preliminaryClean(dollarInput);

    // capture the numeric representation of the dollarInput
    var numericValue = parseInt(dollarInput, 10);

    // add thousands separator
    dollarInput = addThousandsSeparator(dollarInput);

    // note: because we're speculating on long-term investment outcomes,
    // I have refrained from handling decimals (cents, in this context, are meaningless).

    return {
        decoratedValue: dollarInput,
        numericValue: numericValue
    }


}

function handlePercentage(percentageValue, percentageCeiling) {

    // on percentageCeiling:
    // ------------------------
    // The acceptable range for a percentage value differs
    // depending on the context; for example:
    // > Marginal Tax Rate    - can't exceed 100% (barring some strange and kafka-esque dystopian shift)
    // > Return on Investment - no need to constrain


    // strip all non-numeric characters except decimals
    percentageValue = percentageValue.replace(/[^0-9.]/g,'');

    // remove the first decimal, if there are two or more.
    if ((percentageValue.match(/\./g) || []).length > 1) {
        percentageValue = percentageValue.replace('.', ''); // replace the first instance
    }

    // convert string to float
    let floatPercentage = parseFloat(percentageValue);

    // enforce the value ceiling - prevent user input from
    // exceeding a certain value, if requested by the caller.
    if (percentageCeiling && floatPercentage > 100) {

        floatPercentage = 100.0;
        percentageValue = '100';

    }


    return {
        decoratedValue: percentageValue,
        numericValue: floatPercentage
    }

}

function handleInteger(userInput) {

    // preliminary cleaning (non-numeric characters, leading zeroes)
    userInput = preliminaryClean(userInput);

    // capture the numeric representation of the userInput
    var numericValue = parseInt(userInput, 10);

    // return formatted string

    return {
        decoratedValue: userInput,
        numericValue: numericValue
    }

}

function preliminaryClean(userInput) {

    // strip all non-numeric characters
    userInput = userInput.replace(/\D/g,'');

    // strip leading zeroes from input
    userInput = userInput.replace(/^0+/, '');

    return userInput;

}

function isInputValid(numericInput) {

    var validityCheck = (numericInput != null && !isNaN(numericInput)) ? true : false;

    return validityCheck;

}


// export previously declared functions
export { handleDollar };
export { handlePercentage };
export { handleInteger };
export { isInputValid };
