define(['event'],
  function (Event) {
    return function () {
      var pThis = this,
        $node,
        highlightedClass = 'highlighted';

      pThis.render = render;
      pThis.move = move;
      pThis.getOffset = getOffset;
      pThis.toggleHighlight = toggleHighlight;
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

      function toggleHighlight(isHighlighted) {
        $node[isHighlighted ? 'addClass' : 'removeClass'](highlightedClass);
      }

      function getOffset() {
        var offset = $node.offset();
        return [offset.left, offset.top];
      }

      function getPiratePosition(pirateId) {
        // todo:
        var defaultPirateWidth = 30;
        var defaultPirateHeight = 30;

        return {
          coords: [
            $node.width() / 2 - defaultPirateWidth / 2,
            $node.height() / 2 - defaultPirateHeight / 2
          ],
          size: [defaultPirateWidth, defaultPirateHeight]
        };
      }
    }
  });