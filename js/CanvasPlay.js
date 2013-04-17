/*
 * author: Christopher Lovejoy <lovejoy.chris@gmail.com>
 * copyright 2013 under an Attribution Creative Commons license
 * http://creativecommons.org/licenses/by/3.0
 */
function CanvasPlay(options) {
	Extends(options, {
		canvas: null,
		context: "2d"
	});
	CanvasPlay.prototype._super.apply(this, arguments);
	if (typeof options === "undefined") return;
	this.canvas = document.getElementById(this.options.canvasId);
	this.width = parseInt(this.canvas.getAttribute("width"));
	this.height = parseInt(this.canvas.getAttribute("height"));
	this.context = this.canvas.getContext(this.options.context);
};
Extends(CanvasPlay, AnimationController);
CanvasPlay.prototype.clear = function() {
	this.clearCanvas();
	CanvasPlay.prototype._super.prototype.clear.call(this);
};
CanvasPlay.prototype.clearCanvas = function() {
	this.context.clearRect(0, 0, this.width, this.height);
};
