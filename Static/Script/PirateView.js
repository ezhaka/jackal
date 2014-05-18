(function () {

    if (!window.Jackal) {
        window.Jackal = {};
    }

    window.Jackal.PirateView = function (model) {
        var pThis = this,
            $node,
            selectedClass = 'selected';

        pThis.render = render;
        pThis.bindEvents = bindEvents;
        pThis.select = select;
        pThis.deselect = deselect;
        pThis.Click = new window.Jackal.Event(pThis);

        /*
         position = {
             coords: [px, px],
             size: [px, px]
         }
         */
        function render(position) {
            $node = $('<div class="pirate" />');
            $node.attr('id', model.id);

            $node.css({
                left: position.coords[0] + 'px',
                top: position.coords[1] + 'px',
                width: position.size[0],
                height: position.size[1]
            });

            return $node;
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
    }

})();