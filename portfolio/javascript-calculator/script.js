$(document).ready(function() {
  // declare global variables
	var num = "",
		operator = "",
		num2 = "",
		equation = "";
  // variable for top row
	var output = $("#output");
  // set display to 0
	output.text("0");
  // variable for equation history
	var history = $("#history");
  // set display to 0
	history.text("0");

	// receive input from numbers and decimal button
	$('.numbers, #decimal').click(function() {
		if (operator !== "") {
			num2 += this.value;
			equation = num + num2;
			output.text(num2);
			history.text(equation);
		} else {
			num += this.value;
			output.text(num);
			history.text(num);
		}
		checkOperator();
		checkDecimal();
		checkLimit();
	});

	// add operator on click
	$('.operator').click(function() {
		$(this).data('clicked', true);
		num += this.value;
		operator = this.value;
		output.text(operator);
		history.text(num);
		checkOperator();
	});

	// checks if last input was an operator and prevents it from being used twice in a row
	function checkOperator() {
		if (num.slice(-1) === "+" || num.slice(-1) === "-" || num.slice(-1) === "/" || num.slice(-1) === "*") {
			$(".operator").attr("disabled", true);
		} else if (num.slice(-1) === ".") {
			$("#decimal").attr("disabled", true);
		} else {
			$(".operator").removeAttr("disabled");
			$("#decimal").removeAttr("disabled");
			history.text(num);
		}
	};

	// checks display output and produces error if the number is too large for the screen
	function checkLimit() {
		if (num.length > 10 || num2.length > 10 || equation.length > 20) {
			num = "";
			num2 = "";
			operator = "";
			output.text("0");
			history.text("Digit Limit Reached");
		}
	};

	// disallows two decimals in same side of equation
	function checkDecimal() {
		if ((num.indexOf('.') > -1) && num2 === "") {
			$("#decimal").attr("disabled", true);
		} else if (num2 !== "") {
			$("#decimal").removeAttr("disabled");
			if (num2.indexOf('.') > -1) {
				$("#decimal").attr("disabled", true);
			}
		}
	}

	// all clear function
	$('#ac').click(function() {
		num = "";
		num2 = "";
		equation = "";
		operator = "";
		output.text("0");
		history.text("0");
	});

	// clear entry function
	$('#ce').click(function() {
		num = num.slice(0, -1);
		if (num === "") {
			output.text("0");
			history.text("0");
		} else {
			output.text(num);
			history.text(num);
		}
	});

	// provide answer to problem using eval()
	// regex is used to restrict decimal to eight places
	$('#equals').click(function() {
		num = eval(equation);
		num = num.toString().match(/^-?\d+(?:\.\d{0,8})?/)[0]
		output.text(num.substring(0, 10));
		history.text(equation + " = " + num);
		operator = "";
		num2 = "";
		$('.operator').removeAttr('disabled');
	});

});
