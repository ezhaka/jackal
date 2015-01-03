define(['Event', 'cells/CellContentFactory', 'MovingCapabilites', 'CellView', 'MovingObjectType', 'LocationType', 'LocationInfo'],
  function (Event, CellContentFactory, MovingCapabilites, CellView, MovingObjectType, LocationType, LocationInfo) {

    /*
     Accepts model:
     {
     id: 0,
     type: 0,
     coords: [],
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
      pThis.getInfo = getInfo;

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
        var piratePosition = modelMeta.allocator.getObjectLocationInfo({ id: pirateId, type: MovingObjectType.pirate });

        if (piratePosition.cellId != modelMeta.id) {
          throw new Error('Pirate is not on the cell, pirateId: ' + pirateId);
        }

        var neighbourPirateIds = modelMeta.allocator
          .getObjectsByLocationInfo(new LocationInfo({ type: LocationType.cell, id: modelMeta.id, step: piratePosition.step }))
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

      function getInfo() {
        return new LocationInfo({
          id: modelMeta.id,
          type: LocationType.cell
        })
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