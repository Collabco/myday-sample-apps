/**
 * Public Holidays Backstage
 * Collabco, 2018
 */
(function () {
  'use strict';

  angular
    .module('app.collabco.publicholidays', [])
    .config(config);

  config.$inject = ['$stateprovider'];
  function config($stateProvider) {

    // Configure in-app states
    $stateProvider

      // Main state
      .appState({
        appId: 'collabco.publicholidays',
        controller: 'publicHolidaysHomeController as vm',
        dependencies: ['HolidaysApi'],
        html: 'backstage',
        css: 'backstage'        
      });
  }

})();
