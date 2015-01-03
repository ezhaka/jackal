define(['LocationType', 'Event'], function (LocationType, Event) {

  /*
   accepts
   pirateToLocation = {
   'type_id' : { type: , id: 0 } or { type, id: 0, step: 0 }
   }
   */

  return function () {
    var pThis = this,
      objectToLocation = {};

    pThis.getObjectLocationInfo = getObjectLocationInfo;
    pThis.initObjectLocation = setObjectLocation;
    pThis.getObjectsByLocationInfo = getObjectsByLocationInfo;
    pThis.move = move;

    pThis.MoveComplete = new Event(this);

    function move(objInfo, locationInfo) {
      setTimeout(function () {
        setObjectLocation(objInfo, locationInfo);

        var loc = locationInfo.type == LocationType.cell
          ? $.extend(locationInfo, { cellContent: { type: 1 } })
          : locationInfo;

        pThis.MoveComplete.fireHandlers({
          objInfo: objInfo,
          locationInfo: loc
        })
      }, 100);
    }

    function getKey(objInfo) {
      return objInfo.type + '_' + objInfo.id;
    }

    function getObjectInfo(key) {
      var props = key.split('_');
      return { type: +props[0], id: +props[1] };
    }

    /* returns { cellId: 0, step: 0 } */
    function getObjectLocationInfo(objInfo) {
      return objectToLocation[getKey(objInfo)];
    }

    /* returns [0, 0, ...] */
    function getObjectsByLocationInfo(locationInfo) {
      var result = [];

      for (var object_key in objectToLocation) {
        if (objectToLocation.hasOwnProperty(object_key)
          && locationInfo.equals(objectToLocation[object_key])) {
          result.push(getObjectInfo(object_key));
        }
      }

      return result;
    }

    function setObjectLocation(objInfo, locationInfo) {
      objectToLocation[getKey(objInfo)] = locationInfo;
    }
  };

});