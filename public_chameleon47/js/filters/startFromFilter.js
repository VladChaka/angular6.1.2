define([], function() {
    function startFromFilter(){
        return function (input, start) {
            start = +start;
            if (input !== undefined) {
                return input.slice(start);
            }
        }
    }

    return function (module) {
        module.filter('startFromFilter', startFromFilter)
    }
});