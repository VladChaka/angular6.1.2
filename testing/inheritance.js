 /*	
 *	
 *	Functional inheritance
 *	
 */
 let Machine = function () {
	let self = this;
	self._enable = false;

	self.enable = function () {
		self._enable = true;
	}

	self.disable = function () {
		self._enable = false;
	}
 }

 let PC = function () {
	let self = this,
		timer;
	Machine.apply(self);

	function onReady () {
		console.log("Browser started!");
	}

	let enable = self.enable;
	self.enable = function () {
		enable();
		console.log("Computer enabled!");
	}

	let disable = self.disable;
	self.disable = function () {
		disable();
		clearTimeout(timer);
		console.log("Computer disabled!");
	}

	self.runBrowser = function () {
		if (!self._enable) {
			return console.log("Please start the computer");
		}
		timer = setTimeout(onReady, 1000);
	}
 }

 let computer = new PC();

 computer.enable();
 computer.runBrowser();
 computer.disable();

 /*	
 *	
 *	Prototype inheritance
 *	
 */

let Machine1 = function () {
	this._enable = false;
}  
Machine1.prototype.enable = function () {
	this._enable = true;
}
Machine1.prototype.disable = function () {
	this._enable = false;
}

let PC1 = function () {
	this.timer;
	Machine1.apply(this);
}
PC1.prototype = Object.create(Machine1.prototype);
PC1.prototype.onReady = function () {
	console.log("Browser1 started!");
}
PC1.prototype.enable = function () {
	Machine1.prototype.enable.apply(this);

	if (this._enable) {
		console.log("Computer1 enabled!");
	}
}
PC1.prototype.disable = function () {
	Machine1.prototype.disable.apply(this);
	clearTimeout(this.timer);
	console.log("Computer1 disabled!");
}
PC1.prototype.runBrowser = function () {	
	if (!this._enable) {
		return console.log("Please start the computer1");
	}
	this.timer = setTimeout(PC1.prototype.onReady, 1000);
}

let computer1 = new PC1();

computer1.enable();
computer1.runBrowser();
computer1.disable();