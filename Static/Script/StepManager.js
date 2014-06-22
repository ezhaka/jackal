(function (global, JK) {
    JK.StepManager = StepManager;

    function StepManager() {
        var pThis = this;
        pThis.MoveComplete = new window.Jackal.Event(this);

        pThis.move = function(pirateId, cellId) {
            setTimeout(function () {
                pThis.MoveComplete.fireHandlers({
                    pirateId: pirateId,
                    cellId: cellId,
                    cellContent: {
                        type: 1
                    }
                })
            }, 500);
        };
    }
})(window, window.Jackal);