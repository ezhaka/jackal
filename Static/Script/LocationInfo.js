define(function () {
  return function (locationInfo) {
    var pThis = this;

    for (var key in locationInfo) {
      if (locationInfo.hasOwnProperty(key)) {
        pThis[key] = locationInfo[key];
      }
    }

    pThis.equals = function (other) {
      // todo: refactor
      return pThis.type == other.type
        && pThis.id === other.id
        && pThis.step === other.step
        && pThis.shipId == other.shipId;
    }
  }
});