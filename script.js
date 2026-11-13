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
	button.addEventListener("click", handleButtons)
});

function handleButtons() {
	const display = document.querySelector("#display");
	const numbers = document.querySelectorAll(".number");
	let value = display.textContent;
	let buttonValue = this.textContent;

	// handle C button
	if (buttonValue === "C") {
		a = 0;
		b = 0;
		operator = "";
		value = "0";
		numbers.forEach(number => number.removeAttribute("disabled"));
	}

	// handle display values
	if ((value === "0" || value.match(/[-//*+]/)) 
			&& buttonValue.match(/[0-9]/)) {
		value = buttonValue;
	} else if (value !== "0" && buttonValue.match(/[0-9]/)) {
		value += buttonValue;
	}

	// handle operators
	if ((operator === "" || operator.match(/[-//*+]/))
			&& buttonValue.match(/[-//*+]/)) {
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
		a = result;
		b = 0
		operator = "";
		numbers.forEach(number => number.setAttribute("disabled", ""));
	}

	// display values
	if (value) {
		display.classList.remove("monospace");
		if(value.length <= 11 && value.match(/[.]/)) {
			display.textContent = value.slice(0, 11);
		} else if (value.length > 10) {
			//display large numbers
			const power = value.length - 1;
			const divider = parseInt("1".padEnd(value.length, "0"));
			const result2 = parseInt(value) / divider;
			const resultToDisplay = result2.toString().slice(0, 8) + "E" + power;
			display.textContent = resultToDisplay;
		} else {
			display.textContent = value;
		}
		value = "";
	}
}
