(function (JK, global) {

    global.JK = global.JK || {};
    JK = global.JK;

    JK.namespace = function (path) {
        var parts = path.split('.'),
            parent = JK,
            i;

        if (parts[0] == 'JK') {
            parts = parts.slice(1);
        }

        for (i = 0; i < parts.length; i++) {
            if (typeof parent[parts[i]] === 'undefined') {
                parent[parts[i]] = {};
            }

            parent = parent[parts[i]];
        }

        return parent;
    }
})(window.JK, window);
