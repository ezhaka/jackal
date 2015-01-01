define(function () {

  /*
   accepts
   pirateToLocation = {
   'type_id' : { type: , shipId: 0 } or { type, cellId: 0, step: 0 }
   }
   */

  return function () {
    var pThis = this,
      objectToLocation = {};

    pThis.getObjectLocation = getObjectLocation;
    pThis.setObjectLocation = setObjectLocation;
    pThis.getObjectsByLocation = getObjectsByLocation;

    function getKey(obj) {
      return obj.type + '_' + obj.id;
    }

    function getObject(key) {
      var props = key.split('_');
      return { type: +props[0], id: +props[1] };
    }

    /* returns { cellId: 0, step: 0 } */
    function getObjectLocation(obj) {
      return objectToLocation[getKey(obj)];
    }

    /* returns [0, 0, ...] */
    function getObjectsByLocation(location) {
      var result = [];

      for (var object_key in objectToLocation) {
        if (objectToLocation.hasOwnProperty(object_key)
          && areLocationsEqual(location, objectToLocation[object_key])) {
          result.push(getObject(object_key));
        }
      }

      return result;
    }

    function setObjectLocation(obj, location) {
      objectToLocation[getKey(obj)] = location;
    }

    function areLocationsEqual(l1, l2) {
      return l1.type == l2.type && l1.cellId === l2.cellId && l1.step === l2.step && l1.shipId == l2.shipId;
    }
  };

});