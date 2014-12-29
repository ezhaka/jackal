define(['Event', 'cells/CellContentFactory', 'MovingCapabilites', 'CellView'],
  function (Event, CellContentFactory, MovingCapabilites, CellView) {

    /*
     Accepts model:
     {
     id: 0,
     type: 0,
     allocator: Allocator
     }
     */

    return function (modelMeta) {
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
      pThis.isClosed = isClosed;
      pThis.setContent = setContent;
      pThis.getContent = getContent;

      pThis.Click = new Event(pThis);

      function render() {
        return view.render(cellContent ? cellContent.render() : undefined);
      }

      function bindEvents() {
        view.bindEvents();

        view.Click.addHandler(function () {
          pThis.Click.fireHandlers();
        });
      }

      function isClosed() {
        return !cellContent;
      }

      function coords() {
        return modelMeta.coords;
      }

      function getId() {
        return modelMeta.id;
      }

      function setContent(contentModel) {
        if (!contentModel) {
          throw new Error('content model is empty');
        }

        cellContent = CellContentFactory.create(contentModel);
        view.updateContent(cellContent.render());
      }

      function getContent() {
        return cellContent;
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
//			if (cellContent) {
//				cellContent.toggleHighlight(highlighted);
//				return;
//			}

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
            type: MovingCapabilites.neighbor
          };
        }

        return cellContent.getMovingCapabilities(pirateId);
      }

      function init() {
        view = new CellView({id: modelMeta.id});

        if (modelMeta.content) {
          cellContent = CellContentFactory.create(modelMeta.content);
        }
      }

      init();
    };
  });