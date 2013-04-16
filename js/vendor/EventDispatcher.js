function EventDispatcher() {
	this.listeners = {};
};
EventDispatcher.prototype = new InheritanceObject();
EventDispatcher.prototype.addEventListener = function(eventName, listener) {
	if (typeof this.listeners[eventName] === "undefined")
		this.listeners[eventName] = [];
	this.listeners[eventName].push(listener);
};
EventDispatcher.prototype.removeEventListener = function(eventName, listener) {
	if (typeof this.listeners[eventName] !== "undefined") {
		if (typeof listener === "undefined") {
			this.listeners[eventName] = [];
		} else {
			for (var i = 0; i < this.listeners[eventName].length; i++)
			{
				if (this.listeners[eventName][i] === listener) {
					this.listeners[eventName].splice(i, 1);
				}
			}
		}
	}
};
EventDispatcher.prototype.dispatchEvent = function(eventName, data) {
	var eventObj;
	if (typeof this.listeners[eventName] !== "undefined") {
		eventObj = {type: eventName};
		if (typeof (data !== "undefined"))
			eventObj.data = data;
		for (var i = 0; i < this.listeners[eventName].length; i++) {
			if (typeof this.listeners[eventName][i] === "function") {
				this.listeners[eventName][i].apply(this, [eventObj]);
			}
		}
	}
};
