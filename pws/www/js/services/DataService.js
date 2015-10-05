MyApp.factory( 'DataService', ['weatherUnderground', '$http', '$q', '$log', function( weatherUnderground, $http, $q, $log ) {

    var self = this;
    var rawXml = null;

    self.data = {
        neighbourhood: null,
        city: null,
        elevation: null,
        lastTemp: null,
        lastTime: null
    };

    var _getWeatherUrl = function() {
        var apiUrl = weatherUnderground.WU_URL;
        return apiUrl.replace( /!PWS_ID/g, weatherUnderground.WU_PWS_ID );
    };

    var _get = function() {
        var defer = $q.defer();

        var url = _getWeatherUrl();
        $http.jsonp( url ).
            success( function( data ) {
                defer.resolve( data );
                $log.log( "success: _get()" );
            }).
            error( function( error ) {
                defer.reject( error );
                $log.log( "error:", error );
            });

        return defer.promise;
    };

    var _errorHandler = function(error) {

    };

    var DataService = {

        init: function() {
            _get();
        },

        get: function() {
            return _get();
        }
        //getNeighbourhood: function() {
        //
        //},
        //getCity: function() {
        //
        //},
        //getElevation: function() {
        //
        //},
        //getLastTemp: function() {
        //
        //},
        //getLastObservationTime: function() {
        //
        //}
    };

    return DataService;


}])
