//Assign event listeners
let screen = document.querySelector("#screen");

let addButton = document.querySelector("#add");
let subtractButton = document.querySelector("#subtract");
let multiplyButton = document.querySelector("#multiply");
let divideButton = document.querySelector("#divide");
let signButton = document.querySelector("#sign");
let clearButton = document.querySelector("#clear");
let equalsButton = document.querySelector("#equals");

addButton.addEventListener('click', () => operation(addButton.id));
subtractButton.addEventListener('click', () => operation(subtractButton.id));
multiplyButton.addEventListener('click', () => operation(multiplyButton.id));
divideButton.addEventListener('click', () => operation(divideButton.id));
equalsButton.addEventListener('click', equals);
clearButton.addEventListener('click', clear);
signButton.addEventListener('click', () => editInput(signButton.id));

let numeralButtons = document.querySelectorAll(".button.numeral");

numeralButtons.forEach((button) => {
    button.addEventListener('click', () => editInput(button.id));
    //Long form alternative:
    //button.addEventListener('click', function anonHandlerFunction() {
    //     appendDigit(button.id);
    //})
});

//Set up and initialise global variables
let currentValue
let storedValue
let storedOperator
let currentDecimals
let decimalButton
let lastButton
clear();

//Functions triggered by buttons
function editInput(newInput) { 
    if (lastButton == "equals") {
        currentValue = 0;
        currentDecimals = null;
        decimalButton = true;   
    }
    if (newInput == "decimal") {
        if (decimalButton == true) {
            currentDecimals = 0;
            decimalButton = false;
            lastButton = "decimal";
            updateInputScreen();
        }   ; 
    } else if (newInput =="sign") {
        currentValue = currentValue*-1;
        lastButton = "sign";
        updateInputScreen();
    } else {
        lastButton = newInput;
        if (currentDecimals === null) {
            if (currentValue >= 0) {
                currentValue = currentValue*10 + newInput*1;
            } else {
                currentValue = currentValue*10 - newInput*1;
            };
        } else {
            currentDecimals ++;
            if (currentValue >= 0) {
                currentValue = currentValue + newInput*1/(10**currentDecimals);
            } else {
                currentValue = currentValue - newInput*1/(10**currentDecimals);
            };
        };  
        lastButton = "sign";
        updateInputScreen()
    };
};

function operation(operationType) {
    lastButton = operationType;
    if (storedOperator !== null) {
        calculateValue();
    }
    storedValue = currentValue;
    currentValue = 0;
    currentDecimals = null;
    decimalButton = true;
    storedOperator = operationType;
};

function equals() {
    lastButton = "equals";
    calculateValue();
};

function clear() {
    storedValue = null
    storedOperator = null;
    currentValue = 0;
    currentDecimals = null;
    decimalButton = true;
    lastButton = null;
    updateInputScreen()
};

//Intermediate functions
function calculateValue() {
    let calculatedValue
    if (storedOperator === null) {
        calculatedValue = currentValue;
    } else if (storedOperator == "add") {
        calculatedValue = storedValue + currentValue; 
    } else if (storedOperator == "subtract") {
        calculatedValue = storedValue - currentValue;
    } else if (storedOperator == "multiply") {
        calculatedValue = storedValue * currentValue;
    } else if (storedOperator == "divide") {
        calculatedValue = storedValue / currentValue;
    }
    calculatedValue = Math.round(calculatedValue*(10**10))/(10**10);
    currentValue = calculatedValue;
    screen.textContent = currentValue;
    storedOperator = null;
}

function updateInputScreen() {
    let displayedInput = ""
    if (currentDecimals === null) {
        displayedInput += currentValue.toFixed(null);
    } else {
        displayedInput += currentValue.toFixed(currentDecimals);
    }
    if (lastButton == "decimal" || lastButton == "sign" && currentDecimals == 0) {
        displayedInput += ".";
    }
    screen.textContent = displayedInput;
}