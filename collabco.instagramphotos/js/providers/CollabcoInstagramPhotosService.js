(function () {
  'use strict';

  angular
    .module('providers.collabco.instagramphotos')
    .factory('CollabcoInstagramPhotosService', CollabcoInstagramPhotosService);



	function CollabcoInstagramPhotosService ($http, $q, MydayOAuthService) {

		// Initialise the OAuth service
		//
		var _instagramPhotoAPI = Object.create(MydayOAuthService);
		_instagramPhotoAPI.serviceId = 'SampleAppsOAuth';
		_instagramPhotoAPI.isTenantScope = true;
		var _baseUrl = 'https://api.instagram.com/v1';

		// Renews and checks authentication
		//
		_instagramPhotoAPI.initRenew = function (redirect) {
	      var deferred = $q.defer();

	      _instagramPhotoAPI.init().then(function (authenticated) {
	        if (authenticated) {
	          deferred.resolve('Authenticated.');
	        }
	        else {
	          if (redirect) {
	            _instagramPhotoAPI.authenticate();
	          }
	          else{
	          	deferred.reject('Not authenticated.');
      		  }
	        }
	      });

	      return deferred.promise;
	    };


		_instagramPhotoAPI.helloWorld = function(){
			return "Hello World!";
		};

		// Get the current user's recent photos
		//
		_instagramPhotoAPI.getMyRecentPhotos = function(){
			var endpoint = '/users/self/media/recent';
			return _makeRequest({
				method:"GET",
				url:endpoint
			});
		};

		_instagramPhotoAPI.getMyProfileData = function(){
			var endpoint = '/users/self/';
			return _makeRequest({
				method:"GET",
				url:endpoint
			});
		};		

		// Gets any recent photos with the tag 'noFilter'
		//
		_instagramPhotoAPI.getRecentFilterlessPhotos = function(){
			var endpoint = '/tags/nofilter/media/recent';
			return _makeRequest({
				url:endpoint,
				method: "GET"
			});
		};

		// Get the current users counts
		//
		_instagramPhotoAPI.getMyCounts = function(){
			var endpoint = '/users/self';
			return _makeRequest({
		        method: 'GET',
		        url: endpoint
	      	}).then(function(response){
				var object = response.data;
				var counts = {};
				counts.posts = object.counts.media;
				counts.following = object.counts.follows;
				counts.followedBy = object.counts.followed_by;
				return counts;
			});

		};



    	// private function to make the requests
		function _makeRequest (request,parameters) {
			var deferred = $q.defer();
			var accessToken = "?access_token=" + _instagramPhotoAPI.tokenModel.token;
			var callback = "&callback=JSON_CALLBACK";
			

			//$http.defaults.useXDomain = true;
			//delete $http.defaults.headers.common['X-Requested-With'];
			request.url = _baseUrl + request.url + accessToken + callback;
			// Make request
			$http.jsonp(request.url,request.params)
			  .then(function (response) {
			    deferred.resolve(response.data);
			  }, function (exception) {
			      console.log('instagramPhotoAPI Exception', exception);
			      var error = exception.data ? exception.data.error : 'Unknown instagramPhotoAPI error';
			    deferred.reject(error);
			  });
			// Return the promise
			return deferred.promise;
	    };

	    //return the new object created by the factory
	    return _instagramPhotoAPI;
    };


  })();
