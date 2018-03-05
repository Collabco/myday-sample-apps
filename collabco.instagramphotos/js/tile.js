(function() {
  'use strict';

  angular
    .module('tile.collabco.instagramphotos', [])
    .controller('tile.collabco.instagramphotos', TileCtrl)
    .dependencies = ['CollabcoInstagramPhotosService']


  TileCtrl.$inject = ['$scope', '$q', 'MydaySidebar','CollabcoInstagramPhotosService'];
  function TileCtrl ($scope, $q, MydaySidebar,CollabcoInstagramPhotosService) {

    // The tile object representing this tile is accessed at $scope.tile
    var tile = $scope.tile;
    CollabcoInstagramPhotosService
    .initRenew()
    .then(function(){
      if((tile.template == 'info')){
        CollabcoInstagramPhotosService.getMyCounts()
        .then(function(counts){
          tile.content.push({
            title: counts.posts,
            subtitle: 'app.collabco-instagramphotos.tile.POSTS',
            translationMap: {
              title: false,
              subtitle: true
            }
          });
          tile.content.push({
            title: counts.following,
            subtitle: 'app.collabco-instagramphotos.tile.FOLLOWING',
            translationMap: {
              title: false,
              subtitle: true
            }
          });
          tile.content.push({
            title: counts.followedBy,
            subtitle: 'app.collabco-instagramphotos.tile.FOLLOWERS',
            translationMap: {
              title: false,
              subtitle: true
            }
          });
          tile.ready()
        });
      }
      else if(tile.template == 'imgmultiline')
      {
        CollabcoInstagramPhotosService.getMyProfileData()
        .then(function(response){
            tile.content.push({
              title: "Account:",
              subtitle: response.data.full_name,
              image: response.data.profile_picture,
              translationMap: {
                title: false,
                subtitle: false
              }
            });
            tile.ready();
        });
      }

    })
    .catch(function (error) {
      if (error === 'Not authenticated.') {
        tile.error('Unauthorised', 'Click here to grant access to your Instagram Account.');
      }
      else {
        tile.error(null, 'Cannot load data from Instagram');
      }
    });
    //MydaySidebar.setAppNotifications('collabco.instagramphotos', 0);
  }

})();
