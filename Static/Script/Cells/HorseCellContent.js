define(['Inheritance', 'MovingCapabilites', 'cells/HorseCellContentView', 'cells/CellContent'],
  function (Inheritance, MovingCapabilites, HorseCellContentView, CellContent) {
    function HorseCellContent(model) {
      var view;

      this.getContentType = function () {
        return model.type;
      };

      this.getView = function () {
        view = view || new HorseCellContentView(model);
        return view;
      };

      this.getMovingCapabilities = function (pirateId) {
        return {
          type: MovingCapabilites.horse
        };
      };
    }

    Inheritance.inherit(HorseCellContent, CellContent);
    return HorseCellContent;
  });