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
      pThis.type = LocationType.cell;
      pThis.equals = function (loc) {
        return loc.type == pThis.type && loc.getId() == pThis.getId();
      };

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
      function getPiratePosition(pirate) {

        var neighbourPirateIds = [];
        // todo: pass neighbors from parameter?
        /*modelMeta.allocator
          .getObjectsByLocation(pThis)
          .filter(function (obj) {
            return obj.type == MovingObjectType.pirate && obj.getId() != pirate.getId();
          });*/

        return view.getPiratePosition(
          pirate.getId(),
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

      function toggleHighlight(isHighlighted) {
//			if (cellContent) {
//				cellContent.toggleHighlight(isHighlighted);
//				return;
//			}

        view.toggleHighlight(isHighlighted);
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