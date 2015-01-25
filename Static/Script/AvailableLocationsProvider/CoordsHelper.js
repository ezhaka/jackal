define(['LocationType'],
  function (LocationType) {
    return {
      getCoords: function (location, allocator) {
        // todo: it's better to have method coords() in ship, but ship doesn't know about allocator and its cell
        if (location.type == LocationType.ship) {
          return allocator.getObjectLocation(location).coords();
        }

        return location.coords();
      }
    }
  });