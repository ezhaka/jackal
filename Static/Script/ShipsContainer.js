define(['ship', 'event'],
  function (Ship, Event) {
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

      pThis.highlightShips = function(ships) {
        ships.forEach(function (s) {
          s.toggleHighlight(true);
        })
      };

      pThis.removeHighlights = function() {
        ships.forEach(function (s) {
          s.toggleHighlight(false);
        })
      }
    }
  });