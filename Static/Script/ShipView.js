define(['event'],
  function (Event) {
    return function () {
      var pThis = this,
        $node,
        highlightedClass = 'highlighted';

      pThis.render = render;
      pThis.move = move;
      pThis.highlight = highlight;
      pThis.getPiratePosition = getPiratePosition;
      pThis.Click = new Event(pThis);

      function render(pxCoords) {
        $node = $('<div class="ship">К</div>');
        $node.css({
          left: pxCoords[0] + 'px',
          top: pxCoords[1] + 'px'
        });
        $node.click(function () {
          pThis.Click.fireHandlers();
        });
        return $node;
      }

      function move(pxCoords) {
        $node.css({
          left: pxCoords[0] + 'px',
          top: pxCoords[1] + 'px'
        });
      }

      function highlight() {
        $node.addClass(highlightedClass);
      }

      function getPiratePosition(pirateId) {
        // todo:
        var defaultPirateWidth = 30;
        var defaultPirateHeight = 30;

        return {
          coords: [
            $container.width() / 2 - defaultPirateWidth / 2,
            $container.height() / 2 - defaultPirateHeight / 2
          ],
          size: [defaultPirateWidth, defaultPirateHeight]
        };
      }
    }
  });