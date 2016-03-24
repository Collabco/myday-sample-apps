(function(){

'use strict';

angular.module('providers.publicholidays',[])
    .factory('HolidaysApi', HolidaysApi);

function HolidaysApi($http,$q) {
    
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() +1;
    var day = today.getDate();
        return {
            getHolidays: function () {
                var deferred = $q.defer();
                return $http.get('https://dev.mydaycloud.com/api/endpoint/holidays?country=GB&year='+year)
                .then(function (response) {
                    deferred.resolve(response.data);
                    return deferred.promise;
                });

            },
            getUpcoming: function () {
                var deferred = $q.defer();
                var resource = 'https://dev.mydaycloud.com/api/endpoint/holidays?country=GB&year=' + year 
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