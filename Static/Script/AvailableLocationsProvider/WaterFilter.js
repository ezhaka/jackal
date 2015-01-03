define(['cells/CellContentType'], function (CellContentType) {
  return {
    filterByWater: function (pirateCell, availableCells) {
      if (pirateCell.getContent().getContentType() == CellContentType.water) {
        return availableCells.filter(function (c) {
          return c.getContent() ? c.getContent().getContentType() == CellContentType.water : false;
        });
      }

      return availableCells.filter(function (c) {
        return c.getContent() ? c.getContent().getContentType() != CellContentType.water : true;
      });
    }
  }
});