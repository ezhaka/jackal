define(['Event', 'PirateView', 'MovingObjectType'],
  function (Event, PirateView, MovingObjectType) {
    return function (modelMeta) {
      var pThis = this,
        view,
        isSelected;

      pThis.render = render;
      pThis.getId = getId;
      pThis.bindEvents = bindEvents;
      pThis.select = select;
      pThis.deselect = deselect;
      pThis.getIsSelected = getIsSelected;
      pThis.moveTo = moveTo;
      pThis.getInfo = getInfo;
      pThis.type = MovingObjectType.pirate;

      pThis.Click = new Event(pThis);

      /*
       position = {
       coords: [px, px],
       size: [px, px]
       }
       */
      function render(location) {
        var position = getPirateCoordsAndSize(location);
        return view.render(position);
      }

      function moveTo(location) {
        var position = getPirateCoordsAndSize(location);
        view.moveTo(position);
      }

      function getPirateCoordsAndSize(location) {
        var relativePosition = location.getPiratePosition(pThis);
        var locationCoords = location.getOffset();

        return {
          coords: [relativePosition.coords[0] + locationCoords[0], relativePosition.coords[1] + locationCoords[1]],
          size: relativePosition.size
        };
      }

      function getId() {
        return modelMeta.id;
      }

      function bindEvents() {
        view.bindEvents();
      }

      function init() {
        view = new PirateView({id: modelMeta.id});

        view.Click.addHandler(function (args) {
          pThis.Click.fireHandlers(args);
        })
      }

      function getInfo() {
        return {
          id: modelMeta.id,
          type: MovingObjectType.pirate
        }
      }

      function select() {
        isSelected = true;
        view.select();
      }

      function deselect() {
        isSelected = false;
        view.deselect();
      }

      function getIsSelected() {
        return isSelected;
      }

      init();
    };

  });