'use strict';

(function(){

	angular.module('nixApp')
		.config(function ($stateProvider) {
			$stateProvider.state('m.adminT',{
				url : '/adminT',
				templateUrl : 'app/pages/ticket/adminT/adminT.html',
				controller : 'adminTCtrl',
				controllerAs : 'vmat' 
			});
		});
})();