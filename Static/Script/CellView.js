define(['Event'], function (Event) {
  return function (model) {
    var pThis = this,
      $container,
      $cellBack,
      $cellContent;

    var activeClassName = 'active';

    pThis.render = render;
    pThis.bindEvents = bindEvents;
    pThis.getPiratePosition = getPiratePosition;
    pThis.getOffset = getOffset;
    pThis.toggleHighlight = toggleHighlight;
    pThis.updateContent = updateContent;

    pThis.Click = new Event(pThis);

    function render($content) {
      $container = $('<div class="cellContainer" />');
      $cellBack = $('<div class="cellBack" />');
      $container.append($cellBack);
      $cellContent = $('<div class="cellContentWrapper" />');
      $container.append($cellContent);

      if ($content) {
        $cellContent.append($content);
        $cellContent.addClass(activeClassName);
      }
      else {
        $cellBack.addClass(activeClassName);
      }

      return $container;
    }

    function updateContent($content) {
      $cellContent.append($content);
      $cellContent.addClass(activeClassName);
      $cellBack.removeClass(activeClassName);
    }

    /*
     returns {
     coords: [px, px],
     size: [px, px]
     }
     or undefined if pirate is not on the field
     */
    function getPiratePosition(pirateId, neighbourPirateIds) {
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

    function bindEvents() {
      $container.click(function () {
        pThis.Click.fireHandlers();
      });
    }

    function toggleHighlight(highlighted) {
      // todo: rewrite it
      function toggleHighlight(c) {
        (c[highlighted ? 'addClass' : 'removeClass'])('highlighted')
      }
      toggleHighlight($cellBack);
      toggleHighlight($cellContent);
    }

    function getOffset() {
      var offset = $container.offset();
      return [offset.left, offset.top];
    }
  }

});