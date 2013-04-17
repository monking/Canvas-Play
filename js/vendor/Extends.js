/*
 * author: Christopher Lovejoy <lovejoy.chris@gmail.com>
 * copyright 2013 under an Attribution Creative Commons license
 * http://creativecommons.org/licenses/by/3.0
 */

/*
 * _child Object The object to receive the changes
 * _parent Object The object to copy from
 * strict String If "strict", all properties on _parent are copied to _child,
 *     even if they already exist on the _child.
 */
function Extends(_child, _parent, strict) {
	if (typeof _child === "function") {
		_child.prototype = new _parent();
		_child.prototype.constructor = _child;
		_child.prototype._super = _parent;
		_child.prototype._doSuper = function(methodName, args) {
			_parent.prototype[methodName].apply(this, args);
		};
		_child.prototype._superName = function() {
			return this._super.toString().replace(/^function ([^\(]+)(.|\s|\r|\n)*/, "$1");
		};
	} else if (typeof _child === "undefined") {
		_child = _parent;
	} else {
		var key;
		for (key in _parent) {
			if (typeof _child[key] === "undefined" || strict === "strict" )
				_child[key] = _parent[key];
		}
	}
	return _child;
}
