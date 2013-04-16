function CanvasPlay(options) {
	this.options = {
		canvasId: null,
		context: "2d"
	};
	for (var key in this.options) {
		if (key in options) {
			this.options[key] = options[key];
		}
	}
	this.init();
};
CanvasPlay.prototype = new EventDispatcher();
CanvasPlay.prototype.init = function() {
	this.canvas = document.getElementById(this.options.canvasId);
	this.context = this.canvas.getContext(this.options.context);
	this.dispatchEvent(CanvasPlay.INIT);
};
CanvasPlay.prototype.clear = function() {
	// stub
};
CanvasPlay.prototype.INIT = "CanvasPlay_Initialized";
