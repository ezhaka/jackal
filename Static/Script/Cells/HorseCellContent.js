(function (JK) {

    var common = JK.Common,
        cells = JK.Cells;

    JK.HorseCellContent = HorseCellContent;

    function HorseCellContent(model) {
        var view;

        this.getContentType = function () { return model.type; };

        this.getView = function () {
            view = view || new JK.HorseCellContentView(model);
            return view;
        };

        this.getMovingCapabilities = function (pirateId) {
            return {
                type: JK.movingCapabilites.horse
            };
        };
    }

    common.inherit(HorseCellContent, cells.CellContent);

})(window.JK);