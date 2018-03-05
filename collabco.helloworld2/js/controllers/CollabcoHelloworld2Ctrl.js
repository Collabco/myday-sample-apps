(function () {
  'use strict';

  angular
    .module('app.collabco.helloworld2')
    .controller('CollabcoHelloworld2Ctrl', CollabcoHelloworld2Ctrl);



  function CollabcoHelloworld2Ctrl (CollabcoHelloworld2Service) {
    var vm = this;
    CollabcoHelloworld2Service.helloWorldString(1)
    	.then(function(returnStr){
    		vm.str1 = returnStr;
    	});
    CollabcoHelloworld2Service.helloWorldString(2)
    	.then(function(returnstr){
    		vm.str2 = returnstr;
    	});

	CollabcoHelloworld2Service.helloWorldArray()
		.then(function(returnArr){
			vm.claims = returnArr;
		});
  }

})();
