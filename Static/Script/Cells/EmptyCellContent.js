(function () {

	if (!window.Jackal) {
		window.Jackal = {};
	}

	window.Jackal.EmptyCellContent = function () {
		this.getMovingCapabilities = getMovingCapabilities;
		this.render = render;
		this.toggleHighlight = toggleHighlight;

		var view;

		function render() {
			return view.render();
		}

		function getMovingCapabilities(pirateId) {
			return {
				type: window.Jackal.movingCapabilites.neighbor
			}
		}

		function init() {
			view = new window.Jackal.EmptyCellContentView();
		}

		function toggleHighlight(highlighted) {
			view.toggleHighlight(highlighted);
		}

		init();
	};
})();