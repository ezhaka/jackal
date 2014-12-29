define(['Event', 'PirateView'], function (Event, PirateView) {
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

    pThis.Click = new Event(pThis);

    /*
     position = {
     coords: [px, px],
     size: [px, px]
     }
     */
    function render(position) {
      return view.render(position);
    }

    function moveTo(position) {
      view.moveTo(position);
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