(function () {
    var common = window.Jackal.namespace('Common');

    common.inherit = function (C, P) {
        var F = function () {};
        F.prototype = P.prototype;
        C.prototype = new F();
        C.uber = P.prototype;
    };
})();