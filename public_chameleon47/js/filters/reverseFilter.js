define([], function() {
    function reverseFilter() {
        return function(items) {
            if (items!==undefined) {
                return items.slice().reverse();
            }
        }
    }

    return function (module) {
        module.filter('reverseFilter', reverseFilter)
    }
});