(function (global, JK) {
    JK.StepManager = StepManager;

    function StepManager() {
        var pThis = this;
        pThis.MoveComplete = new JK.Event(this);

        pThis.move = function(pirateId, cellId) {
            setTimeout(function (JK) {
                pThis.MoveComplete.fireHandlers({
                    pirateId: pirateId,
                    cellId: cellId,
                    cellContent: {
                        type: 1
                    }
                })
            }, 100);
        };
    }
})(window, JK);