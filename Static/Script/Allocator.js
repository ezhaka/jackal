define(['LocationType', 'Event', 'LocationProvider', 'MovingObjectProvider'],
  function (LocationType, Event, LocationProvider, MovingObjectProvider) {

    return function (pirates, field, shipContainer) {
      var pThis = this,
        objectToLocation = {},
        movingObjProvider = new MovingObjectProvider(pirates, shipContainer),
        locationProvider = new LocationProvider(field, shipContainer);

      pThis.getObjectLocation = getObjectLocation;
      pThis.initObjectLocation = setObjectLocation;
      pThis.getObjectsByLocation = getObjectsByLocation;
      pThis.move = move;

      pThis.MoveComplete = new Event(this);

      function move(obj, location) {
        setTimeout(function () {
          setObjectLocation(obj.getInfo(), location.getInfo());

          if (location.type == LocationType.cell && location.isClosed()) {
            location.setContent({type: 1});
          }

          pThis.MoveComplete.fireHandlers({
            obj: obj,
            location: location
          })
        }, 100);
      }

      function getObjectLocation(obj) {
        var locationInfo = objectToLocation[getKey(obj.getInfo())];
        return locationProvider.getByInfo(locationInfo);
      }

      function getObjectsByLocation(location) {
        var result = [];

        for (var key in objectToLocation) {
          if (objectToLocation.hasOwnProperty(key)
            && location.getInfo().equals(objectToLocation[key])) {
            var objectInfo = getObjectInfo(key);
            result.push(movingObjProvider.getByObjInfo(objectInfo));
          }
        }
        return result;

      }

      function setObjectLocation(objInfo, locationInfo) {
        objectToLocation[getKey(objInfo)] = locationInfo;
      }

      function getObjectInfo(key) {
        var props = key.split('_');
        return {type: +props[0], id: +props[1]};
      }

      function getKey(objInfo) {
        return objInfo.type + '_' + objInfo.id;
      }
    };

  });