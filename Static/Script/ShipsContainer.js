define(['Ship'],
  function (Ship) {
    return function (shipModels) {
      var pThis = this,
        ships = shipModels.map(function (m) {
          return new Ship(m);
        });

      pThis.getShips = function () { return ships; };

      pThis.getById = function (id) {
        return ships.filter(function (s) {
          return s.getId() == id;
        })[0];
      };
    }
  });