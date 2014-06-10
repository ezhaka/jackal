(function () {

	if (!window.Jackal) {
		window.Jackal = {};
	}

	window.Jackal.CellView = function (model) {
		var pThis = this,
			$container,
			$cellBack,
			$cellContent;

		pThis.render = render;
		pThis.bindEvents = bindEvents;
		pThis.getPiratePosition = getPiratePosition;
		pThis.getOffset = getOffset;
		pThis.toggleHighlight = toggleHighlight;

		pThis.Click = new window.Jackal.Event(pThis);

		function render($content) {
			$container = $('<div class="cellContainer" />');
			$cellBack = $('<div class="cellBack" />');
			$container.append($cellBack);

			if ($content)
			{
				$cellContent = $('<div class="cellContentWrapper" />');
				$cellContent.append($content);
				$container.append($cellContent);
			}

			return $container;
		}

		/*
		 returns {
		 coords: [px, px],
		 size: [px, px]
		 }
		 or undefined if pirate is not on the field
		 */
		function getPiratePosition(pirateId, neighbourPirateIds) {
			// todo:
			var defaultPirateWidth = 30;
			var defaultPirateHeight = 30;

			return {
				coords: [
						$container.width() / 2 - defaultPirateWidth / 2,
						$container.height() / 2 - defaultPirateHeight / 2
				],
				size: [defaultPirateWidth, defaultPirateHeight]
			};
		}

		function bindEvents() {
			$container.click(function () {
				pThis.Click.fireHandlers();
			});
		}

		function toggleHighlight(highlighted) {
			($cellBack[highlighted ? 'addClass' : 'removeClass'])('highlighted');
		}

		function getOffset() {
			var offset = $container.offset();
			return [offset.left, offset.top];
		}
	}

})();