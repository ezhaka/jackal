define(['ShipView'], function (ShipView) {
  return function (model) {
    var pThis = this,
      view = new ShipView();

    pThis.render = render;
    pThis.move = move;
    pThis.getId = function () { return model.id; };

    function render(pxCoords) {
      return view.render(pxCoords);
    }

    function move(pxCoords) {
      view.move(pxCoords);
    }
  };
});