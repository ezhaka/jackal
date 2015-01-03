define(['MovingObjectType'], function (MovingObjectType) {
  // todo: make piratesContainer
  return function (pirates, shipsContainer) {
    this.getByObjInfo = function (objInfo) {
      if (objInfo.type == MovingObjectType.pirate) {
        return pirates.filter(function (p) { return p.getId() == objInfo.id; })[0];
      }

      if (objInfo.type == MovingObjectType.ship) {
        return shipsContainer.getById(objInfo.id);
      }

      throw new Error('unknown moving object type: ' + objInfo.type);
    }
  }
});