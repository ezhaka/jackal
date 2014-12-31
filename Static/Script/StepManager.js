define(['Event'], function (Event) {
  return function () {
    var pThis = this;
    pThis.MoveComplete = new Event(this);

    pThis.move = function (pirateId, cellId) {
      setTimeout(function () {
        pThis.MoveComplete.fireHandlers({
          pirateId: pirateId,
          cellId: cellId,
          cellContent: {
            type: 1
          }
        })
      }, 100);
    };

    pThis.moveToShip = function (pirateId, shipId) {
      setTimeout(function () {
        pThis.MoveComplete.fireHandlers({
          pirateId: pirateId,
          shipId: shipId
        })
      })
    }
  }
});