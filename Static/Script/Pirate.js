(function () {

    if (!window.Jackal) {
        window.Jackal = {};
    }

    window.Jackal.Pirate = function(modelMeta) {
        var pThis = this;

        pThis.render = render;

        function render() {
            return window.Jackal.PirateTemplate({ id: modelMeta.id });
        }
    };

})();