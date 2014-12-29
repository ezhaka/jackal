define(function () {
  function CellContentView() {
  }

  CellContentView.prototype = {
    toggleHighlight: function (highlighted) {
      var $node = this.getNode();
      ($node[highlighted ? 'addClass' : 'removeClass'])('highlighted');
    },
    getNode: function () {
      return $('<div class="cellContent" />');
    }
  };

  return CellContentView;
});