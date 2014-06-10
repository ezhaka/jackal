(function () {

	if (!window.Jackal) {
		window.Jackal = {};
	}

	window.Jackal.ArrowCellContent = function (model) {
		this.getMovingCapabilities = getMovingCapabilities;
		this.render = render;
		this.toggleHighlight = toggleHighlight;

		var view;

		function render() {
			return view.render();
		}

		function getMovingCapabilities(pirateId) {
			return {
				direction: model.direction,
				type: window.Jackal.movingCapabilites.neighbor,
				haveToMakeAnotherStep: true
			};
		}

		function toggleHighlight(highlighted) {
			view.toggleHighlight(highlighted);
		}

		function init() {
			view = new window.Jackal.ArrowCellContentView(model);
		}

		init();
	};
})();