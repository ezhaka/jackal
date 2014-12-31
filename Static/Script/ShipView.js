define(function () {
  return function () {
    var pThis = this,
      $node;

    pThis.render = render;
    pThis.move = move;

    function render(pxCoords) {
      $node = $('<div class="ship">К</div>');
      $node.css({
        left: pxCoords[0] + 'px',
        top: pxCoords[1] + 'px'
      });
      return $node;
    }

    function move(pxCoords) {
      $node.css({
        left: pxCoords[0] + 'px',
        top: pxCoords[1] + 'px'
      });
    }
  }
});