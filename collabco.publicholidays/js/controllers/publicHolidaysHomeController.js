(function () {
  'use strict';

  angular
    .module('app.collabco.publicholidays')    
    .controller('publicHolidaysHomeController', publicHolidaysHomeController);

    function publicHolidaysHomeController($scope, HolidaysApi) {
        var vm = this;
        $scope.title = "This is a TEST App!!";
        $scope.subtitle = "Here are a list of holiday dates for the UK"
        HolidaysApi.getHolidays()
          .then(function (result) {
              $scope.holidays = result.holidays;
          });
    }
})();
