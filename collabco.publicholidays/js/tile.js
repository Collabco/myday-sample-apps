/**
 * Public Holidays 
 * Collabco, 2016
 */

(function () {
  'use strict';

  angular
    .module('tile.collabco.publicholidays', [])
    .controller('tile.collabco.publicholidays', TileCtrl)
    .dependencies = ['HolidaysApi'];


  function TileCtrl ($scope,HolidaysApi) {

    var tile = $scope.tile;
    var tileContent  = [];
    

    // Medium
    if (tile.template === 'info') {
      tileContent = [{
        title:    'Public Holidays',
        subtitle: '---'
      }];
    }

    // Wide
    else if (tile.template === 'multiline') {
      HolidaysApi.getUpcoming()
      .then(function (result) {
          var holidays = result.holidays;          
          
          if (tile.size === 2) {
            tileContent = [{
              title:    'Next Holiday: ' + holidays[0].name,
              subtitle: holidays[0].date
            }];
          }    
        // Large
          else {
            tileContent = [{
              title:    'Hello 4x4 World',
              subtitle: 'This is a multiline tile with size of 4x4, so the content can be bigger.'
            }, {
              title:    'Hello again',
              subtitle: 'Second object here. This content will be cycled' +
                        ' with scroll animation like on good old Myday Cloud.'
            }];
          }
          
          tile.content = tileContent;
          tile.ready();
      });
    }

  }

})();
