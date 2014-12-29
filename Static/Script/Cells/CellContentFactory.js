define(
  [
    'cells/CellContentType',
    'cells/EmptyCellContent',
    'cells/ArrowCellContent',
    'cells/HorseCellContent',
    'cells/WaterCellContent'],
  function (CellContentType, EmptyCellContent, ArrowCellContent, HorseCellContent, WaterCellContent) {
    return {
      create: function (model) {
        switch (model.type) {
          case CellContentType.empty:
            return new EmptyCellContent(model);

          case CellContentType.arrow:
            return new ArrowCellContent(model);

          case CellContentType.horse:
            return new HorseCellContent(model);

          case CellContentType.water:
            return new WaterCellContent(model);

          default:
            throw new Error('Unknown cell content type ' + model.type);
        }
      }
    };
  });