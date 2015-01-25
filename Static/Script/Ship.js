define(['ShipView', 'event', 'MovingObjectType', 'MovingCapabilites'],
  function (ShipView, Event, MovingObjectType, MovingCapabilites) {
    return function (model) {
      var pThis = this,
        view = new ShipView(),
        isSelected;

      pThis.render = render;
      pThis.moveTo = moveTo;
      pThis.toggleHighlight = toggleHighlight;
      pThis.getInfo = getInfo;
      pThis.getPiratePosition = getPiratePosition;
      pThis.getId = getId;
      pThis.type = MovingObjectType.ship;
      pThis.getOffset = getOffset;
      pThis.getMovingCapabilities = getMovingCapabilities;
      pThis.select = select;
      pThis.deselect = deselect;
      pThis.getIsSelected = getIsSelected;
      pThis.equals = function (loc) {
        return loc.type == pThis.type && loc.getId() == pThis.getId();
      };

      pThis.Click = new Event(pThis);

      function render(location) {
        return view.render(location.getOffset());
      }

      function moveTo(location) {
        view.move(location.getOffset());
      }

      function getId() {
        return model.id;
      }

      function getPiratePosition(pirate) {
        return view.getPiratePosition(pirate.getId());
      }

      function toggleHighlight(isHighlighted) {
        view.toggleHighlight(isHighlighted);
      }

      function getInfo() {
        return {
          id: model.id,
          type: MovingObjectType.ship
        }
      }

      function getOffset() {
        return view.getOffset();
      }

      function getMovingCapabilities() {
        return {
          type: MovingCapabilites.neighbor
        };
      }

      function select() {
        view.select();
        isSelected = true;
      }

      function deselect() {
        view.deselect();
        isSelected = false;
      }

      function getIsSelected() {
        return isSelected;
      }

      function init() {
        view.Click.addHandler(function () {
          pThis.Click.fireHandlers();
        })
      }

      init();
    };
  });