define({
  top: 1,
  topRight: 2,
  right: 4,
  bottomRight: 8,
  bottom: 16,
  bottomLeft: 32,
  left: 64,
  topLeft: 128,
  hasDirection: function (direction, concreteDirection) {
    return (direction & concreteDirection) > 0;
  }
});