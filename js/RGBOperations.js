function RGBOperations(methodName) {
	if (typeof RGBOperations.prototype[methodName] === "function") {
		return RGBOperations.prototype[methodName](Array.prototype.slice.apply(arguments, [1]));
	}
}
RGBOperations.prototype.randomDecimal = function() {
	var I = RGBOperations.prototype;
	return I.compileDecimal(
		Math.random() * 256,
		Math.random() * 256,
		Math.random() * 256
	);
}
RGBOperations.prototype.randomHex = function() {
	var I = RGBOperations.prototype;
	return I.compileHex(
		Math.random() * 256,
		Math.random() * 256,
		Math.random() * 256
	);
}
RGBOperations.prototype.compileDecimal = function(R, G, B) {
	return R * 256 * 256 + G * 256 + B;
}
RGBOperations.prototype.compileHex = function(R, G, B) {
	var I = RGBOperations.prototype;
	return I.decimalToHex(R)
		+ I.decimalToHex(G)
		+ I.decimalToHex(B);
}
RGBOperations.prototype.decimalToHex = function(decimal) {
	var hex, key;

	hex = "";
	key = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
	decimal = parseInt(decimal);
	while (decimal > 0) {
		hex = key[decimal % 16] + hex;
		decimal = parseInt(decimal / 16);
	}
	return hex;
}
