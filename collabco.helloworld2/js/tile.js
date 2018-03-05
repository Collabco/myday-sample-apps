(function() {
  'use strict';

  angular
    .module('tile.collabco.helloworld2', [])
    .controller('tile.collabco.helloworld2', TileCtrl)
    .dependencies = ['CollabcoHelloworld2Service'];



  function TileCtrl ($scope, MydaySidebar,CollabcoHelloworld2Service) {

    // The tile object representing this tile is accessed at $scope.tile
    var tile = $scope.tile;
    var hwArr = ["No content"];

    //MydaySidebar.setAppNotifications('collabco.helloworld2', 0);

    CollabcoHelloworld2Service.helloWorldArray()
      .then(function(hwArrParam){
        if(hwArrParam){
          hwArr =hwArrParam;
        }
            // Depending on the template, display different content.
        if (tile.template === 'info') {

          for(var i = 0;i<hwArr.length;i++){
            tile.content.push({
              title: hwArr[i],
              subtitle: '',
              translationMap: {
                title: false,
                subtitle: false
              }
            });        
          }
        }
        tile.ready();
        });


  }

})();
