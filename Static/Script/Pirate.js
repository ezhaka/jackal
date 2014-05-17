(function () {

    if (!window.Jackal) {
        window.Jackal = {};
    }

    window.Jackal.Pirate = function(modelMeta) {
        var pThis = this,
            view;

        pThis.render = render;
        pThis.getId = getId;

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

        function init() {
            view = new window.Jackal.PirateView({ id: modelMeta.id });
        }

        init();
    };

})();