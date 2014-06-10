(function () {

	if (!window.Jackal) {
		window.Jackal = {};
	}

	/*
	 Accepts model:
	 {
	 id: 0,
	 type: 0,
	 allocator: window.Jackal.Allocator
	 }
	 */

	window.Jackal.Cell = function (modelMeta) {
		var pThis = this,
			view,
			cellContent;

		pThis.render = render;
		pThis.bindEvents = bindEvents;
		pThis.coords = coords;
		pThis.getPiratePosition = getPiratePosition;
		pThis.getOffset = getOffset;
		pThis.getId = getId;
		pThis.getMovingCapabilities = getMovingCapabilities;
		pThis.toggleHighlight = toggleHighlight;

		pThis.Click = new window.Jackal.Event(pThis);

		function render() {
			return view.render(cellContent ? cellContent.render() : undefined);
		}

		function bindEvents() {
			view.bindEvents();

			view.Click.addHandler(function () {
				pThis.Click.fireHandlers();
			});
		}

		function coords() {
			return modelMeta.coords;
		}

		function getId() {
			return modelMeta.id;
		}

		/*
		 returns {
		 coords: [px, px],
		 size: [px, px]
		 }
		 or undefined if pirate is not on the field
		 */
		function getPiratePosition(pirateId) {
			var piratePosition = modelMeta.allocator.getPirateLocation(pirateId);

			if (piratePosition.cellId != modelMeta.id) {
				throw new Error('Pirate is not on the cell, pirateId: ' + pirateId);
			}

			var neighbourPirateIds = modelMeta.allocator
				.getCellPirateIds(modelMeta.id, piratePosition.step)
				.filter(function (pid) {
					return pid != pirateId;
				});

			return view.getPiratePosition(
				pirateId,
				neighbourPirateIds);
		}

		function getOffset() {
			return view.getOffset();
		}

		function toggleHighlight(highlighted) {
			if (cellContent) {
				cellContent.toggleHighlight(highlighted);
				return;
			}

			view.toggleHighlight(highlighted);
		}

		/*
		 returns
		 {
		 type: 0,
		 direction: 0,
		 haveToMakeAnotherStep: 0
		 }
		 */
		function getMovingCapabilities(pirateId) {
			if (!cellContent) {
				return {
					type: window.Jackal.movingCapabilites.neighbor
				};
			}

			return cellContent.getMovingCapabilities(pirateId);
		}

		function init() {
			view = new window.Jackal.CellView({ id: modelMeta.id });

			if (modelMeta.content) {
				cellContent = window.Jackal.CellContentFactory.create(modelMeta.content);
			}
		}

		init();
	};

})();