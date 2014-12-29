define(['Event'], function (Event) {
  return function (model) {
    var pThis = this,
      $node,
      selectedClass = 'selected';

    pThis.render = render;
    pThis.bindEvents = bindEvents;
    pThis.select = select;
    pThis.deselect = deselect;
    pThis.moveTo = moveTo;
    pThis.Click = new Event(pThis);

    /*
     position = {
     coords: [px, px],
     size: [px, px]
     }
     */
    function render(position) {
      $node = $('<div class="pirate" />');
      $node.attr('id', model.id);
      $node.css(positionToCssObject(position));

      return $node;
    }

    function moveTo(position) {
      $node.animate(positionToCssObject(position));
    }

    function select() {
      $node.addClass(selectedClass);
    }

    function deselect() {
      $node.removeClass(selectedClass);
    }

    function bindEvents() {
      $node.click(function () {
        pThis.Click.fireHandlers();
      })
    }

    function positionToCssObject(position) {
      return {
        left: position.coords[0] + 'px',
        top: position.coords[1] + 'px',
        width: position.size[0],
        height: position.size[1]
      };
    }
  }

});