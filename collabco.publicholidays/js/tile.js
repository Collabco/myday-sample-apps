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

  TileCtrl.$inject = ['$scope', 'HolidaysApi','_'];
  function TileCtrl ($scope,HolidaysApi,_) {

    var tile = $scope.tile;

    // Medium
    if (tile.template === 'info') {
      var tileContent = [{
        title:    'Public Holidays',
        subtitle: '---'
      }];
    }

    // Wide
    else if (tile.template === 'multiline') {
      HolidaysApi.getUpcoming()
      .then(function (result) {
          var holidays = result.holidays;          
          var tileContent = [];

          if (tile.size === 2) {
            tileContent = [{
              title:    'Next Holiday: ' + _.values(holidays)[0][0].name,
              subtitle: _.values(holidays)[0][0].date
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
      },function(error){
          console.log(error);
      });
    }

  }

})();
