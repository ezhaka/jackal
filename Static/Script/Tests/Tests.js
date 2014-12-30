requirejs.config({
  baseUrl: 'Script'
});

requirejs(
  [
    'tests/neighborCellsProvider',
    'tests/cellHelper'
  ],
  function () {
  });