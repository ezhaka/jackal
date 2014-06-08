(function () {
	if (!window.Jackal) {
		window.Jackal = {};
	}

	window.Jackal.direction = {
		top: 1,
		topRight: 2,
		right: 4,
		bottomRight: 8,
		bottom: 16,
		bottomLeft: 32,
		left: 64,
		topLeft: 128
	};

	window.Jackal.movingCapabilites = {
		nowhere: 1,
		neighbor: 2,
		anywhere: 4,
		untilWater: 8,
		ship: 16,
		back: 32,
		forward: 64
	};
})();