/*
 * author: Christopher Lovejoy <lovejoy.chris@gmail.com>
 * copyright 2013 under an Attribution Creative Commons license
 * http://creativecommons.org/licenses/by/3.0
 */

/*
 * Takes any number of arguments. Behaves differently for Functions and all
 * other Objects.
 *
 * Each Function argument inherits its next argument as its new prototype, and
 * the `_super` property is added as a reference to that parent function. All
 * but the last argument will be altered.
 *
 * Object arguments are layered onto the first argument so that earlier
 * arguments take precedent, and only the first argument is altered.
 */
function Extends() {
	var i, len;
	len = arguments.length;
	if (typeof arguments[0] === "function") {// affects all arguments
		for (i = len - 1; i >= 1; i--) {
			Extends.prototype.inheritFunction(arguments[i-1], arguments[i]);
		}
	} else {
		for (i = 1; i < len; i++) {// affects only the first argument
			arguments[0] = Extends.prototype.inheritObject(arguments[0], arguments[i]);
		}
	}
	return arguments[0];
}
Extends.prototype.inheritFunction = function(_child, _parent) {
	_child.prototype = new _parent();
	_child.prototype.constructor = _child;
	_child.prototype._super = _parent;
	_child.prototype._doSuper = function(methodName, args) {
		_parent.prototype[methodName].apply(this, args);
	};
	_child.prototype._superName = function() {
		return this._super.toString().replace(/^function ([^\(]+)(.|\s|\r|\n)*/, "$1");
	};
	return _child;
};
Extends.prototype.inheritObject = function(_child, _parent) {
	if (typeof _child === "undefined") {
		_child = _parent;
	} else {
		var key;
		for (key in _parent) {
			if (typeof _child[key] === "undefined")
				_child[key] = _parent[key];
		}
	}
	return _child;
};
