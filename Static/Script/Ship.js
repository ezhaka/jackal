define(['ShipView', 'event'],
  function (ShipView, Event) {
    return function (model) {
      var pThis = this,
        view = new ShipView();

      pThis.render = render;
      pThis.move = move;
      pThis.highlight = highlight;
      pThis.getId = function () {
        return model.id;
      };

      pThis.getCellId = function () {
        return model.cellId;
      };

      pThis.Click = new Event(pThis);

      function render(pxCoords) {
        return view.render(pxCoords);
      }

      function move(pxCoords) {
        view.move(pxCoords);
      }

      function highlight() {
        view.highlight();
      }

      function init() {
        view.Click.addHandler(function () {
          pThis.Click.fireHandlers();
        })
      }

      init();
    };
  });