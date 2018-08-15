function print() {	
	let result = "";
	for (let i = 0; i < arguments.length; i++) {
		result += arguments[i] + " ";
	}
	return result;
}

function func(print) {
	let args = arguments, 
		massArgs = [];

	if (typeof print !== 'function') {
		return function () {
			console.log('The first arguments must be function!');
		} 
	}

	for (let i = 1; i < args.length; i++) {
		massArgs[i - 1] = args[i];
	}

	return function () {
	  	let argsArr = Array.prototype.slice.call(arguments, 0);
		massArgs = massArgs.concat(argsArr);
	  	return print.apply(this, massArgs);
	}
} 

let a = func(print, "Привет", "меня", "зовут", "Влад", "и", "мне", 21 + ".")();