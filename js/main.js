var presets;
window.onload = function() {
	var control, liveControls, /*presets, */presetsElement,
		name, element, initOptions;

	initOptions = {
		canvasId: "play"
	};
	function init() {
		window.squiggly = new Squiggly(Extends({}, presets["Bworp"], initOptions));
		setupControls();
	}
	controls = {};
	liveControls = {
		leaveTrails: true,
		frameRate:   true,
		skipFrames:  true
	};
	autoResetControls = {
		lifetime:       true,
		numItems:       true,
		linkPeriods:    true,
		maxPetals:      true,
		minPeriod:      true,
		maxPeriod:      true,
		minRadius:      true,
		maxRadius:      true,
		minOrbitRadius: true,
		maxOrbitRadius: true,
		minOrbitOffset: true,
		maxOrbitOffset: true
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
			applyControlChanges();
		};
		for (param in controls) {
			controls[param].onchange = function() {
				var param, value;
				param = this.getAttribute("name");
				value = getControlValue(this);
				updateControlReadout(this, value);
				if (typeof liveControls[param] !== "undefined")
					window.squiggly.options[param] = value;
				if (typeof autoResetControls[param] !== "undefined")
					applyControlChanges();
			};
		}
		presetsElement = document.querySelector(".controls [name=presets]");
		for (name in presets) {
			element = document.createElement("option");
			element.innerHTML = name;
			presetsElement.appendChild(element);
		}
		presetsElement.onchange = function() {
			resetSquiggly(Extends({}, presets[this.options[this.selectedIndex].innerHTML]));
			updateAllControls();
		};
		document.querySelector('.controls [data-action="resetChanges"]').onclick = function(event) {
			resetSquiggly(presets[presetsElement.options[presetsElement.selectedIndex].innerHTML]);
			updateAllControls();
		};
		document.querySelector('.controls [data-action="clearCanvas"]').onclick = function(event) {
			window.squiggly.clearCanvas();
		};
	}
	function applyControlChanges() {
		var options, selectedFavorite;
		options = {};
		for (param in controls) {
			options[param] = getControlValue(controls[param]);
		}
		selectedFavorite = presetsElement.options[presetsElement.selectedIndex].innerHTML;
		resetSquiggly(Extends({}, options, presets[selectedFavorite]));
	}
	function updateAllControls() {
		var param, control;
		for (param in controls) {
			setControlValue(controls[param], window.squiggly.options[param]);
		}
	}
	function updateControlReadout(control, value) {
		var readout, param, factor, suffix;
		param = control.getAttribute("name");
		readout = document.querySelector('.controls [ref="' + param + '"]');
		if (readout) {
			factor = readout.getAttribute("data-factor");
			suffix = readout.getAttribute("data-suffix") || "";
			if (typeof value === "undefined") {
				value = getControlValue(control);
			}
			readout.innerHTML = (factor ? Math.round(10 * factor * value) / 10 : value) + suffix;
		}
	}
	function getControlValue(control) {
		if (control.getAttribute("type") === "checkbox") {
			return control.checked;
		} else {
			if (control.value) { // return empty strings and 0 as null
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
			control.value = (value === null ? "" : value);
		}
		updateControlReadout(control, value);
	}
	function restartSquiggly() {
		resetSquiggly(window.squiggly.options);
	}
	function resetSquiggly(options) {
		window.squiggly.clear();
		delete window.squiggly;
		window.squiggly = new Squiggly((Extends(options, initOptions)));
	}
	presets = {
		"Black Hole": {
			leaveTrails: false,
			numItems: 1000,
			maxPetals: 19,
			minPeriod: 2500,
			maxPeriod: 6000,
			minRadius: 1,
			maxRadius: 2,
			minOrbitRadius: 70,
			maxOrbitRadius: 150,
			minOrbitOffset: 0.9,
			maxOrbitOffset: 0.9
		},
		"Bworp": {
			leaveTrails: true,
			numItems: 30,
			maxPetals: 6,
			minPeriod: 3500,
			maxPeriod: 9000,
			minRadius: 2,
			maxRadius: 40
		},
		"Sketch": {
			leaveTrails: true,
			numItems: 50,
			maxPetals: 6,
			minPeriod: 6000,
			maxPeriod: 6000,
			minRadius: 1,
			maxRadius: 1
		},
		"Streak": {
			leaveTrails: true,
			lifetime: 500,
			numItems: 50,
			maxPetals: 4,
			minPeriod: 5000,
			maxPeriod: 9000,
			minRadius: 2,
			maxRadius: 10,
			minOrbitRadius: 80,
			maxOrbitRadius: 150
		},
		"Tesseract": {
			leaveTrails: false,
			numItems: 1000,
			maxPetals: 19,
			minPeriod: 6000,
			maxPeriod: 6000,
			minRadius: 1,
			maxRadius: 1,
			minOrbitRadius: 30,
			maxOrbitRadius: 150
		},
		"DJ": {
			leaveTrails: true,
			numItems: 15,
			maxPetals: 1,
			minPeriod: 3500,
			maxPeriod: 9000,
			minRadius: 4,
			maxRadius: 50,
			minOrbitRadius: 30,
			maxOrbitRadius: 200,
			minOrbitOffset: 0,
			maxOrbitOffset: 0
		},
		"Hadron": {
			leaveTrails: false,
			numItems: 1000,
			maxPetals: 19,
			minPeriod: 3000,
			maxPeriod: 9000,
			minRadius: 1,
			maxRadius: 2,
			minOrbitRadius: 200,
			maxOrbitRadius: 200,
			minOrbitOffset: 0.3,
			maxOrbitOffset: 0.3
		},
		"Solar": {
			leaveTrails: false,
			numItems: 7,
			maxPetals: 6,
			minPeriod: 3000,
			maxPeriod: 12000,
			minRadius: 4,
			maxRadius: 20,
			minOrbitRadius: 30,
			maxOrbitRadius: 150,
			minOrbitOffset: 0,
			maxOrbitOffset: 0.3
		}
	};

	init();
};
