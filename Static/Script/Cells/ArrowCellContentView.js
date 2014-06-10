(function () {

	if (!window.Jackal) {
		window.Jackal = {};
	}

	window.Jackal.ArrowCellContentView = function (model) {
		var pThis = this,
			$node;

		pThis.render = render;
		pThis.toggleHighlight = toggleHighlight;

		function render() {
			$node = $('<div class="arrowCellContent cellContent" />');
			$node.text(model.direction);

			return $node;
		}

		function toggleHighlight(highlighted) {
			($node[highlighted ? 'addClass' : 'removeClass'])('highlighted');
		}
	}

})();