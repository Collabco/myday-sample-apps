(function () {
  'use strict';

  angular
    .module('app.collabco.instagramphotos')
    .controller('CollabcoInstagramPhotosCtrl', CollabcoInstagramPhotosCtrl)

  CollabcoInstagramPhotosCtrl.$inject = ['$scope','CollabcoInstagramPhotosService'];
  function CollabcoInstagramPhotosCtrl ($scope,CollabcoInstagramPhotosService) {
    var vm = this;
    vm.view = CollabcoInstagramPhotosService.helloWorld();
    CollabcoInstagramPhotosService.getMyProfileData()
    .then(function(response){
    	vm.account = response.data;
    });
	CollabcoInstagramPhotosService.getMyRecentPhotos()
	.then(function(response){
		// maps the item from customItems in the scope to the gridsterItem options
		$scope.customItemMap = {
		    sizeX: 2,
		    sizeY: 2
		};

		vm.photos = response.data;
	});
   };	

})();
