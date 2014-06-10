(function () {

	if (!window.Jackal) {
		window.Jackal = {};
	}

	window.Jackal.EmptyCellContentView = function (model) {
		var pThis = this,
			$node;

		pThis.render = render;
		pThis.toggleHighlight = toggleHighlight;

		function render() {
			$node = $('<div class="emptyCellContent cellContent" />');
			return $node;
		}

		function toggleHighlight(highlighted) {
			($node[highlighted ? 'addClass' : 'removeClass'])('highlighted');
		}
	}

})();