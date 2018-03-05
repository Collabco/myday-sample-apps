(function () {
  'use strict';

  angular
    .module('providers.collabco.helloworld2')
    .service('CollabcoHelloworld2Service', CollabcoHelloworld2Service);



  function CollabcoHelloworld2Service ($http, $q, MydayEnv) {

  	var _baseUrl = 'https://collabco-helloworldapi.azurewebsites.net/api/v1/';

    this.helloWorldArray = function(){
	    return _http({
	        url: 'helloworld',
	        method: 'GET'
	      });
    };

    this.helloWorldString = function(id){
	    return _http({
	        url: 'helloworld/'+id,
	        method: 'GET'
	      });
    };

    this.helloWorldVersion = function(){
	    return $http({
	        url: 'helloworld/version',
	        method: 'GET'
	      });
    };
  

    /**
     * myday identity server setup (open id connect)
     */
    var redirectPrefix = window.location.protocol + '//' + window.location.host + '/auth/';
    var oidcSettings = {
      authority: MydayEnv.idSrvUrl,
      client_id: MydayEnv.idSrvClientId,
      popup_redirect_uri: redirectPrefix + 'popup.html',
      max_age: 1, // -> new - number of seconds the token is valid for
      silent_renew: true,
      silent_redirect_uri: redirectPrefix + 'silent-renew.html',
      response_type: 'token',
      scope: 'myday-api',
      persistKey: 'TokenManager.collabco-helloworld2', // -> new - identifies locally stored data from OIDC manager as belonging to this app
      request_state_key: 'TokenManager.collabco-helloworld2.progress', // -> new - identifies the current state of the oidc object
      filter_protocol_claims: true // -> new - removes unnecessary OIDC claims
    };
    var oidcMgr = new OidcTokenManager(oidcSettings);
    var inProgress = false;
     
    function ip () {
    inProgress = false;
    }
     
    var renew = function () {
      if (window.cordova) { // -> new - checks if the app is currently running in the mobile application
       return $q.when();
      }
      if (inProgress &amp;&amp; typeof inProgress.then === 'function') {
       return inProgress;
      }
      if (!oidcMgr.access_token || oidcMgr.expired || oidcMgr.expires_in &lt; 15) {
        var df = $q.defer();
        oidcMgr.renewTokenSilentAsync().then(df.resolve, df.reject);
        inProgress = df.promise.then(ip, ip);
        return inProgress;
      }
        return $q.when();
    };
     
    /**
    * Helper wrapper for all $http requests
    * This makes sure that token is renewed and added to the header
    */
    function _http (request) {
      return renew()
      .then(function () {
     
        request.url = _baseUrl + request.url;
        if (window.cordova) { // -> new
          request.sendMydayBearerToken = true;
        } else {
          request.headers = request.headers||{};
          request.headers.Authorization = 'Bearer ' + oidcMgr.access_token;
        }
        return $http(request);
      })
      .then(function (response) {
        return response.data;
      });

    } 

  }
})();
