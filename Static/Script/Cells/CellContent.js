(function (JK) {
    JK.namespace('Cells').CellContent = CellContent;
    JK.namespace('Cells').CellContentView = CellContentView;

    function CellContent() {}

    CellContent.prototype = {
        getView: function () {
            throw new Error('not implemented');
        },
        render: function () {
            return this.getView().render();
        },
        toggleHighlight: function () {
            return this.getView().toggleHighlight()
        }
    };

    function CellContentView() {}

    CellContentView.prototype = {
        toggleHighlight: function (highlighted) {
            var $node = this.getNode();
            ($node[highlighted ? 'addClass' : 'removeClass'])('highlighted');
        },
        getNode: function () {
            return $('<div class="cellContent" />');
        }
    };
})(window.JK);