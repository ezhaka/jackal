define(['cells/CellContent', 'Inheritance', 'MovingCapabilites', 'cells/EmptyCellContentView'],
  function (CellContent, Inheritance, MovingCapabilites, EmptyCellContentView) {
    function EmptyCellContent(model) {
      var view;

      this.getContentType = function () {
        return model.type;
      };

      this.getMovingCapabilities = function (pirateId) {
        return {
          type: MovingCapabilites.neighbor
        }
      };

      this.getView = function () {
        view = view || new EmptyCellContentView();
        return view;
      };
    }

    Inheritance.inherit(EmptyCellContent, CellContent);
    return EmptyCellContent;
  });