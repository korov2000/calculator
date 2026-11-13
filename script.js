// math variables
let a = 0;
let b = 0;
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

// create event listener on all buttons
const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {
	button.addEventListener("click", handleButton)
});

function handleButton() {
	const display = document.querySelector("#display");
	const numbers = document.querySelectorAll(".number");
	let value = display.textContent;
	let buttonValue = this.textContent;
	let resetDisplay = value;

	// handle C button
	if (buttonValue === "C") {
		a = 0;
		b = 0;
		operator = "";
		value = "0";
		numbers.forEach(number => number.removeAttribute("disabled"));
	}

	// handle display values
	//if (value.match(/[-//*+0]/) && buttonValue.match(/[0-9]/)) {
	if ((value === "0" || value.match(/[-//*+]/)) 
			&& buttonValue.match(/[0-9]/)) {
		value = buttonValue;
	} else if (value !== "0" && buttonValue.match(/[0-9]/)) {
		value += buttonValue;
	}

	// handle operator
	if ((operator === "" || operator.match(/[-//*+]/)) && buttonValue.match(/[-//*+]/)) {
		if (a === 0) {
			a = value;
		}
		operator = buttonValue;
		display.textContent = operator;
		display.classList.add("monospace");
		value = "";
		numbers.forEach(number => number.removeAttribute("disabled"));
	} else if (operator !== "" && buttonValue === "=") {
		b = value;
		const result = operate(a, b, operator);
		value = result.toString();
		a = result.toString();
		b = "0"
		operator = "";
		numbers.forEach(number => number.setAttribute("disabled", ""));
	}

	if (value) {
		display.classList.remove("monospace");
		display.textContent = value;
		value = "";
	}
}
