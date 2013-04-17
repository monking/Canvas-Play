/*
 * author: Christopher Lovejoy <lovejoy.chris@gmail.com>
 * copyright 2013 under an Attribution Creative Commons license
 * http://creativecommons.org/licenses/by/3.0
 */
function AnimationController(options) {
	var I = this;
	if (typeof options === "undefined") return;

	this.options = Extends(options, {
		frameRate: null,
		skipFrames: 0
	});
	this.paused = false;
	this.framesSkipped = 0;
	this.lastFrameTime = new Date().getTime();
	this.frameDuration = 0;
	this.frameRequest = function() {
		var showFrame, newFrameTime;

		I.frameIndex = window.requestAnimationFrame(I.frameRequest);
		if (I.paused) {
			return;
		}

		showFrame = false;
		newFrameTime = new Date().getTime();
		I.frameDuration = newFrameTime - I.lastFrameTime;
		if (I.options.frameRate) {
			if (I.frameDuration >= 1000 / I.options.frameRate)
				showFrame = true;
		} else if (I.framesSkipped >= I.options.skipFrames) {
			showFrame = true;
		}
		I.framesSkipped++;
		if (showFrame) {
			// console.log(I.frameDuration);
			I.onAnimationFrame.apply(I, arguments);
			I.lastFrameTime = newFrameTime;
			I.framesSkipped = 0;
		}
	}
	
};
Extends(AnimationController, EventDispatcher);
AnimationController.prototype.play = function() {
	this.stop();
	window.requestAnimationFrame(this.frameRequest);
};
AnimationController.prototype.stop = function() {
	this.paused = false;
	window.cancelAnimationFrame(this.frameIndex);
};
AnimationController.prototype.onAnimationFrame = function() {
	// stub
};
AnimationController.prototype.clear = function() {
	this.stop();
};
