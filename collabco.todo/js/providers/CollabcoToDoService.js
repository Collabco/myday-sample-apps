(function () {
  'use strict';

  angular
    .module('providers.collabco.todo')
    .service('CollabcoToDoService', CollabcoToDoService);



  function CollabcoToDoService () {

    var STORAGE_ID = 'collabco.todo';

    // Get from localStorage
    this.get = function () {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    };

    // Save to localStorage
    this.save = function (items) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(items));
    };
  }

})();
