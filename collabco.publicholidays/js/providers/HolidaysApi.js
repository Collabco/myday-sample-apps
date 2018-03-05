(function(){

'use strict';

angular.module('providers.publicholidays',[])
    .factory('HolidaysApi', HolidaysApi);

HolidaysApi.$inject = ['$http','$q', 'Apps'];
function HolidaysApi($http,$q, Apps) {
    
    // set up endpoint name default before trying to access from settings
    var _endPoint = "holidays";
    var _settings = Apps.getAppSettings('collabco.publicholidays');
    if(_settings){
        if(_settings.endpointName){
            _endPoint = _settings.endpointName;
        }
    } 

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() +1;
    var day = today.getDate();
        return {
            getHolidays: function () {
                var deferred = $q.defer();
                return $http.get('/api/endpoint/' + _endPoint + '?country=GB&year='+year)
                .then(function (response) {
                    deferred.resolve(response.data);
                    return deferred.promise;
                });

            },
            getUpcoming: function () {
                var deferred = $q.defer();
                var resource = '/api/endpoint/' + _endPoint + '?country=GB&year=' + year 
                +'&month=' +month 
                +"&day="+ day
                +'&upcoming';
                return $http.get(resource)
                .then(function(response){
                    deferred.resolve(response.data);
                    return deferred.promise;
                });
            }
        };

    }
})(); 