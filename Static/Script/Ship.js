define(['ShipView', 'event', 'MovingObjectType'],
  function (ShipView, Event, MovingObjectType) {
    return function (model) {
      var pThis = this,
        view = new ShipView();

      pThis.render = render;
      pThis.move = move;
      pThis.highlight = highlight;
      pThis.getInfo = getInfo;
      pThis.getPiratePosition = getPiratePosition;
      pThis.getId = getId;

      pThis.getCellId = function () {
        return model.cellId;
      };

      pThis.Click = new Event(pThis);

      function render(location) {
        return view.render(location.getOffset());
      }

      function move(location) {
        view.move(location.getOffset());
      }

      function getId() {
        return model.id;
      }

      function getPiratePosition(pirateId) {
        return view.getPiratePosition(pirateId);
      }

      function highlight() {
        view.highlight();
      }

      function getInfo() {
        return {
          id: model.id,
          type: MovingObjectType.ship
        }
      }

      function init() {
        view.Click.addHandler(function () {
          pThis.Click.fireHandlers();
        })
      }

      init();
    };
  });