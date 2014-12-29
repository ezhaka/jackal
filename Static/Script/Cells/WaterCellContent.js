define(['cells/WaterCellContentView', 'MovingCapabilites', 'Inheritance', 'cells/CellContent'],
  function (WaterCellContentView, MovingCapabilites, Inheritance, CellContent) {
    function WaterCellContent(model) {
      var view;

      this.getContentType = function () {
        return model.type;
      };

      this.getView = function () {
        view = view || new WaterCellContentView(model);
        return view;
      };

      this.getMovingCapabilities = function (pirateId) {
        return {
          type: MovingCapabilites.water
        };
      };
    }

    Inheritance.inherit(WaterCellContent, CellContent);
    return WaterCellContent;
  });