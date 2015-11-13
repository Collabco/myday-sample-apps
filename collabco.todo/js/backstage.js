(function () {
  'use strict';

  angular
    .module('app.collabco.todo', [])
    .config(['$stateProvider', config]);



  function config ($stateProvider) {

    var main = {
      appId: 'collabco.todo',
      html: 'main',
      controller: 'CollabcoToDoCtrl as vm',
      dependencies: ['CollabcoToDoService']
    };

    $stateProvider.appState(main);
  }


})();
