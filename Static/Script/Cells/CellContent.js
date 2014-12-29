define(function () {
  function CellContent() {
  }

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

  return CellContent;
});