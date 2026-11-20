// math variables
let a = "";
let b = "";
let operator = "";


// math functions
function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
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

buttons.forEach(button => button.addEventListener("click", handleButtons));

function handleButtons() {
	let buttonValue = this.textContent;

	clearValues(buttonValue)

	handleValues(buttonValue);

	handleCalculation(buttonValue);
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

function handleValues(buttonValue) {
	// if dot is pressed before any other value display "0" 
	if (displayValue === "" && buttonValue === ".") {
		displayValue = "0";
	}	
	
	// display no more then 10 digits or 11 digits if you have dot
	if (
		(displayValue.length < 10 && buttonValue.match(/[0-9.]/)) ||
		(displayValue.length < 11 && displayValue.match(/[.]/))
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

	// disable dot button if user already typed dot
	const dot = document.querySelector("#dot");

	if (displayValue.match(/[.]/)) {
		dot.setAttribute("disabled", "")
	} else {
		dot.removeAttribute("disabled")
	}
}

function handleCalculation(buttonValue) {
	let result = "";
	if (a && b && operator && buttonValue.match(/[-+*//=]/)) {
		result = operate(a, b, operator);
		if (result) {
			result = result.toString();
		}
		a = result;
		b = "";
		displayResult(result);
	}
}

function displayResult(result) {
	// display large decimal numbers
	if (result.length >= 11 && result.match(/[.]/)) {
		display.textContent = result.slice(0, 11);
	// display large numbers
	} else if (result.length > 10) {
		const power = result.length - 1;
		const divideNumber = parseInt("1".padEnd(result.length, "0"));
		result = parseInt(result) / divideNumber;
		result = result.toString().slice(0, 8) + "E" + power;
		display.textContent = result;
	// divide by zero
	} else if (result === "Infinity") {
		display.classList.add("monospace");
		display.textContent = "Nice try :)!"
	// just display result
	} else {
		display.textContent = result;
	}
}