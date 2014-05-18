(function () {

    if (!window.Jackal) {
        window.Jackal = {};
    }

    window.Jackal.Pirate = function(modelMeta) {
        var pThis = this,
            view;

        pThis.render = render;
        pThis.getId = getId;
        pThis.bindEvents = bindEvents;
        pThis.select = select;
        pThis.Click = new window.Jackal.Event(pThis);

        /*
        position = {
            coords: [px, px],
            size: [px, px]
        }
         */
        function render(position) {
            return view.render(position);
        }

        function getId() {
            return modelMeta.id;
        }

        function bindEvents() {
            view.bindEvents();
        }

        function init() {
            view = new window.Jackal.PirateView({ id: modelMeta.id });

            view.Click.addHandler(function (args) {
                pThis.Click.fireHandlers(args);
            })
        }

        function select() {
            view.select();
        }

        init();
    };

})();