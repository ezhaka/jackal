define(
  [
    'availableLocationsProvider/cellHelper',
    'availableLocationsProvider/coordsHelper',
    'cells/CellContentType'
  ],
  function (CellHelper, CoordsHelper, CellContentType) {
    var GroundDirection = {
      top: 1,
      right: 2,
      bottom: 3,
      left: 4
    };

    return function (field, allocator) {
      this.getLocations = getLocations;

      function getLocations(objLocation) {
        return getAvailableCells(objLocation, getGroundDirection(objLocation));
      }

      function getAvailableCells(objLocation, groundDirection) {
        var result = [];

        if (isGroundCell(objLocation, rotateCoords([1, 1], groundDirection))) {
          result.push(getCellByOffset(objLocation, rotateCoords([0, 1], groundDirection)));
        }

        if (isGroundCell(objLocation, rotateCoords([1, -1], groundDirection))) {
          result.push(getCellByOffset(objLocation, rotateCoords([0, -1], groundDirection)));
        }

        return result;
      }

      function rotateCoords(topCoords, groundDirection) {
        var result = topCoords;
        if (groundDirection == GroundDirection.left || groundDirection == GroundDirection.right) {
          result.reverse();
        }

        if (groundDirection == GroundDirection.bottom || groundDirection == GroundDirection.left) {
          result[0] *= -1;
          result[1] *= -1;
        }

        return result;
      }

      function getGroundDirection(objLocation) {
        if (isGroundCell(objLocation, [1, 0])) {
          return GroundDirection.top;
        }

        if (isGroundCell(objLocation, [0, 1])) {
          return GroundDirection.right;
        }

        if (isGroundCell(objLocation, [-1, 0])) {
          return GroundDirection.bottom;
        }

        if (isGroundCell(objLocation, [0, -1])) {
          return GroundDirection.left;
        }

        throw new Error('no ground in any direction');
      }

      function isGroundCell(objLocation, offset) {
        var cell = getCellByOffset(objLocation, offset);

        if (!cell) {
          return false;
        }

        return cell.isClosed() || cell.getContent().getContentType() != CellContentType.water;
      }

      function getCellByOffset(objLocation, offset) {
        var coords = CoordsHelper.getCoords(objLocation, allocator);
        var absoluteCoords = CellHelper.getAbsoluteCoords(coords, offset);
        return field.getCellsByCoords([absoluteCoords])[0];
      }
    }
  });