define(['cells/ArrowCellContentView', 'MovingCapabilites', 'cells/CellContent', 'Inheritance'],
  function (ArrowCellContentView, MovingCapabilites, CellContent, Inheritance) {
    function ArrowCellContent(model) {
      var view;

      this.getContentType = function () {
        return model.type;
      };

      this.getView = function () {
        view = view || new ArrowCellContentView(model);
        return view;
      };

      this.getMovingCapabilities = function (pirateId) {
        return {
          direction: model.direction,
          type: MovingCapabilites.neighbor,
          haveToMakeAnotherStep: true
        };
      };
    }

    Inheritance.inherit(ArrowCellContent, CellContent);
    return ArrowCellContent;
  });