requirejs.config({
  baseUrl: 'Script'
});

requirejs(
  [
    'tests/neighborCellsProvider',
    'tests/horseCellsProvider',
    'tests/cellHelper'
  ],
  function () {
  });