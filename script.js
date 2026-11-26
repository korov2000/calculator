// math variables
let a = "";
let b = "";
let operator = "";


// math functions
function add(a, b) {
	return (a + b);
}

function subtract(a, b) {
	return (a - b);
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function operate(a, b, operator) {
	a = parseFloat(a);
	b = parseFloat(b);

	switch (operator) {
		case "+":
			return add(a, b);
		case "-":
			return subtract(a, b);
		case "*":
			return multiply(a, b);
		case "/":
			return divide(a, b);
		default:
			break;
	}
}

// get display and buttons
const buttons = document.querySelectorAll(".button");
const display = document.querySelector("#display");

// calculator variables
let buttonValue = "";
let displayValue = "";
let operatorValue = "";

// buttons implementation
buttons.forEach(button => button.addEventListener("click", handleButtons));

function handleButtons() {
	let buttonValue = this.textContent;

	clearValues(buttonValue)

	handleValues(buttonValue);

	backspace(buttonValue)

	handleCalculation(buttonValue);
}

// keyboard implementation
document.addEventListener("keydown", handleKeys);

function handleKeys(event) {
	// prevent Enter key to click on buttons
	if (event.key === "Enter") {
		event.preventDefault();
	}

	let key = event.key;

	// swapping keys for one used in calculator functions
	switch (key) {
		case "Enter":
			key = "=";
			break;
		case "Backspace":
			key = "⌫";
			break;
		case ",":
			key = ".";
			break;
		case "c":
			key = "C";
			break;
		case "Delete":
			key = "C";
			break;
	}

	// handle function keys
	if (key === "F1" || key === "F2" || key === "F3" || key === "F4" ||
			key === "F5" || key === "F6" || key === "F7" || key === "F8" ||
			key === "F9" || key === "F10" || key === "F11" || key === "F12") {
		return;
	}

	clearValues(key);

	handleValues(key);

	backspace(key)

	handleCalculation(key);
}


// calculator functions
function clearValues(buttonValue) {
	if (buttonValue === "C") {
		a = "";
		b = "";
		operator = "";
		buttonValue = "";
		displayValue = "";
		operatorValue = "";
		display.classList.remove("monospace");
		display.textContent = "0";
	}
}

function backspace(buttonValue) {
	if (buttonValue === "⌫" && displayValue) {
		displayValue = displayValue.slice(0, displayValue.length - 1);
		
		if (displayValue.length === 0) {
			display.textContent = "0";
		} else {
			display.textContent = displayValue;
		}
	}	
}

function handleValues(buttonValue) {
	// if dot is pressed before any other value display "0" before dot
	if (displayValue === "" && buttonValue === ".") {
		displayValue = "0";
	}	
	
	// display only dot and numbers and no more then 10 digits or 11 digits if you have dot
	if (
		(displayValue.length < 10 && buttonValue.match(/[0-9.]/) && !displayValue.match(/[.]/)) ||
		(displayValue.length < 11 && buttonValue.match(/[0-9]/) && displayValue.match(/[.]/))
	) {
		displayValue += buttonValue;
	} 

	// write a anb b variables
	if (buttonValue.match(/[-+*//]/) && !a && !b) {
		a = displayValue;
		displayValue = "";
	} else if (buttonValue.match(/[-+*//=]/) && a && !b) {
		b = displayValue;
		displayValue = "";
	}

	// if operator button is pressed and only a have value, save operator value
	if (buttonValue.match(/[-+*//]/) && a && !b) {
		operatorValue = buttonValue;
		displayValue = buttonValue;
	}
	
	// if operator button is pressed and both a and b have values, set operator 
	// and save next operator for feature calculations
	if (buttonValue.match(/[-+*//=]/) && a && b) {
		operator = operatorValue;
		operatorValue = buttonValue;
	}

	// when user press equal sign reset operator and a
	if (buttonValue.match(/[0-9.]/) && operatorValue === "=" && a) {
		operatorValue = "";
		a = "";
	}

	// displaying operators
	if (displayValue.match(/[-+*//]/)) {
		display.classList.add("monospace");
		display.textContent = displayValue;
		displayValue = "";
	} else if (displayValue) {
		display.classList.remove("monospace");
		display.textContent = displayValue;
	}
}

function handleCalculation(buttonValue) {
	let result = "";
	if (a && b && operator && buttonValue.match(/[-+*//=]/)) {
		result = operate(a, b, operator);
		//if (result) {
			result = result.toString();
		//}
		a = result;
		b = "";
		displayResult(result);
	}
}

function displayResult(result) {
	// find the length od the whole number 
	const wholeNumberLength = result.indexOf(".") > 0 ? result.indexOf(".") : result.length;

	// display large numbers
	if (wholeNumberLength >= 10) { 
		// round large decimal number to whole number
		result = parseFloat(result);
		result = result.toFixed(0);

		// calculate power of 10 (eg. 945.6712E12)
		const power = result.length - 1;
		const divideNumber = parseInt("1".padEnd(result.length, "0"));
		result = parseInt(result) / divideNumber;
		result = result.toString().slice(0, 8) + "E" + power;
		display.textContent = result;
	} 

	// display small numbers
	else if (wholeNumberLength < 10) { 
		// choose correct decimal length
		let numOfDecimals = 10 - result.indexOf(".");
		result = parseFloat(result);
		result = result.toFixed(numOfDecimals);

		// handle zeroes at the end of decimal number
		for (let i = result.length - 1; i > 0; i--) {
			if ((result[i] === "0" && result.match(/[.]/)) || result[i] === ".") {
				result = result.slice(0, i);
			} else {
				break;
			}
		}
		display.textContent = result;
	} 

	// divide by zero
	else if (result === "Infinity") {
		display.classList.add("monospace");
		display.textContent = "Nice try :)!";
	} 
	
	// just display result
	else {
		display.textContent = result;
	}
}