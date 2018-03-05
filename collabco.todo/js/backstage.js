(function () {
  'use strict';

  angular
    .module('app.collabco.todo', [])
    .config(config);


  config.$inject = ['$stateProvider'];
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
