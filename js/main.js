window.onload = function() {
	var control, liveControls, favorites, favoritesElement,
		name, element, options;

	options = {
		canvasId: "play",
		numItems: 100
	};
	function init() {
		window.squiggly = new Squiggly(Extends(favorites.bworp, options));
		setupControls();
	}
	controls = {};
	liveControls = {
		leaveTrails: true,
		frameRate:   true,
		skipFrames:  true
	};
	function setupControls() {
		var param, control;

		for (param in window.squiggly.options) {
			control = document.querySelector('.controls input[name="' + param + '"]');
			if (control) {
				controls[param] = control;
				setControlValue(control, window.squiggly.options[param]);
			}
		}
		updateAllControls();
		document.querySelector('form.controls').onsubmit = function(event) {
			event.preventDefault();
			options = window.squiggly.options;
			for (param in controls) {
				options[param] = getControlValue(controls[param]);
			}
			resetSquiggly(options);
		};
		for (param in liveControls) {
			controls[param].onchange = function() {
				window.squiggly.options[this.getAttribute("name")] = getControlValue(this);
			};
		}
		favoritesElement = document.querySelector(".controls [name=favorites]");
		for (name in favorites) {
			element = document.createElement("option");
			element.innerHTML = name;
			favoritesElement.appendChild(element);
		}
		favoritesElement.onchange = function() {
			resetSquiggly(Extends(favorites[this.options[this.selectedIndex].innerHTML], options));
			updateAllControls();
		};
	}
	function updateAllControls() {
		var param, control;
		for (param in controls) {
			control = document.querySelector('.controls input[name="' + param + '"]');
			setControlValue(control, window.squiggly.options[param]);
		}
	}
	function getControlValue(control) {
		if (control.getAttribute("type") === "checkbox") {
			return control.checked;
		} else {
			if (control.value.length) {
				if (isNaN(control.value)) {
					return control.value;
				} else {
					return Number(control.value);
				}
			} else {
				return null;
			}
		}
	}
	function setControlValue(control, value) {
		if (control.getAttribute("type") === "checkbox") {
			control.checked = value;
		} else {
			control.value = value === null ? "" : value;
		}
	}
	function resetSquiggly(options) {
		window.squiggly.clear();
		delete window.squiggly;
		window.squiggly = new Squiggly(options);
	}
	favorites = {
		"bworp": {
			leaveTrails: true,
			numItems: 30,
			minPeriod: 3500,
			maxPeriod: 9000,
			minRadius: 2,
			maxRadius: 40
		},
		"sketch": {
			leaveTrails: true,
			numItems: 50,
			minPeriod: 6000,
			maxPeriod: 6000,
			minRadius: 1,
			maxRadius: 1
		},
		"streak": {
			leaveTrails: true,
			lifetime: 500,
			numItems: 50,
			minPeriod: 5000,
			maxPeriod: 9000,
			minRadius: 2,
			maxRadius: 10,
			minOrbitRadius: 80,
			maxOrbitRadius: 130,
		},
		"solar": {
			leaveTrails: false,
			numItems: 7,
			minPeriod: 3000,
			maxPeriod: 12000,
			minRadius: 4,
			maxRadius: 40,
			minOrbitRadius: 30,
			maxOrbitRadius: 150,
		}
	};

	init();
};
