(function (JK) {

    var common = JK.Common,
        cells = JK.Cells;

    JK.WaterCellContent = WaterCellContent;

    function WaterCellContent(model) {
        var view;

        this.getView = function () {
            view = view || new JK.WaterCellContentView(model);
            return view;
        };

        this.getMovingCapabilities = function (pirateId) {
            return {
                type: JK.movingCapabilites.water
            };
        };
    }

    common.inherit(WaterCellContent, cells.CellContent);

})(window.JK);