(function () {
  'use strict';

  angular
    .module('app.collabco.helloworld2', [])
    .config(['$stateProvider', config]);



  function config ($stateProvider) {

    var main = {
      appId: 'collabco.helloworld2',
      html: 'main',
      controller: 'CollabcoHelloworld2Ctrl as vm',
      dependencies: ['CollabcoHelloworld2Service']
    };

    $stateProvider.appState(main);
  }


})();
