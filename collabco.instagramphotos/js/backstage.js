(function () {
  'use strict';

  angular
    .module('app.collabco.instagramphotos', [])
    .config(config);



  function config ($stateProvider) {

    var main = {
      appId: 'collabco.instagramphotos',
      html: 'main',
      css: 'insta',
      controller: 'CollabcoInstagramPhotosCtrl as vm',
      dependencies: ['CollabcoInstagramPhotosService'],
      resolve: {
        // Dependencies is myday app framework keyword, used to get dependencies from the 'dependencies' property of the state
        authorised: function (Dependencies,CollabcoInstagramPhotosService) {
          return CollabcoInstagramPhotosService.initRenew(true);
        },
        deps: function ($ocLazyLoad) {
           return $ocLazyLoad.load(['gridster']); // gridster is a dependency of myday, but can be re-used inside other apps
         }
      }
    };      

    $stateProvider.appState(main);
  }


})();
