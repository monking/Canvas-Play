function Squiggly(options) {
	Extends(options, {
		numItems: 12,
		minPeriod: 3000,
		maxPeriod: 9000,
		minRadius: 2,
		maxRadius: 20,
		minOrbitRadius: 30,
		maxOrbitRadius: 130,
		leaveTrails: true,
		lifetime: null
	});
	this.age = 0;
	Extends(options, Squiggly.prototype.options);
	Squiggly.prototype._super.apply(this, [options]);
	this.items = [];
	for (i = 0; i < this.options.numItems; i++) {
		this.add(/*params object*/);
	}
	this.context.font = "sans-serif 14px";
	this.context.textBaseline = "top";
	this.play();
};
Extends(Squiggly, CanvasPlay);
Squiggly.prototype.clear = function() {
	delete this.items;
	Squiggly.prototype._super.prototype.clear.call(this);
};
Squiggly.prototype.onAnimationFrame = function(params) {
	this.age += this.frameDuration;
	if (this.options.lifetime && this.age > this.options.lifetime) {
		this.stop();
	}
	this.options.leaveTrails || this.clearCanvas();
	var i, len;
	this._doSuper("onAnimationFrame")
	for (i = 0, len = this.items.length; i < len; i++) {
		this.step(this.items[i]);
	}
};
Squiggly.prototype.add = function(params) {
	item = {
		progress: Math.random(),
		orbitRadius: this.options.minOrbitRadius + Math.random() * (this.options.maxOrbitRadius - this.options.minOrbitRadius),
		radius: this.options.minRadius + Math.random() * (this.options.maxRadius - this.options.minRadius),
		color: "#" + RGBOperations("randomHex"),
		offset: Math.random(),
		kilter: Math.random()
	};
	item.period = this.options.minPeriod + Math.random() * (this.options.maxPeriod - this.options.minPeriod);
	this.items.push(item);
};
Squiggly.prototype.step = function(item) {
	var x, y;
	item.kilter = item.kilter - this.frameDuration / item.period / (1 + 5 * item.offset);
	item.progress = (item.progress + this.frameDuration / item.period) % 1;
	item.originX = this.width / 2 + Math.cos(Math.PI * 2 * item.kilter) * item.orbitRadius * item.offset;
	item.originY = this.height / 2 + Math.sin(Math.PI * 2 * item.kilter) * item.orbitRadius * item.offset;
	x = item.originX + Math.cos(Math.PI * 2 * item.progress) * item.orbitRadius;
	y = item.originY + Math.sin(Math.PI * 2 * item.progress) * item.orbitRadius;

	// origin crosshair
	// this.context.fillStyle = "#000";
	// this.context.fillRect(item.originX + 0.5, item.originY - 4.5, 1, 10);
	// this.context.fillRect(item.originX - 4.5, item.originY + 0.5, 10, 1);

	// circle shape
	this.context.beginPath();
	this.context.arc(x, y, item.radius, 0, Math.PI * 2, false);
	this.context.closePath();
	this.context.fillStyle = item.color;
	this.context.fill();
};
