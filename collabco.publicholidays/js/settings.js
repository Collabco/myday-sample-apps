(function () {
    'use strict';
  
    angular
      .module('app.collabco.publicholidays.settings', [])
      .controller('CollabcoPublicHolidaysSettingsCtrl', CollabcoPublicHolidaysSettingsCtrl);
  
  
    CollabcoPublicHolidaysSettingsCtrl.$inject = ['$scope'];
    function CollabcoPublicHolidaysSettingsCtrl ($scope) {
      var settingsObj = $scope.modal.app.tenantSettings;
  
      if (typeof settingsObj.endpointName === 'undefined') {
        settingsObj.endpointName = "publicHolidays";
      }
    }
  
  })();