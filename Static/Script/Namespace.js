(function (global) {
    global.Jackal = global.Jackal || {};

    global.Jackal.namespace = function (path) {
        var parts = path.split('.'),
            parent = global.Jackal,
            i;

        if (parts[0] == 'Jackal') {
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
})(window);
