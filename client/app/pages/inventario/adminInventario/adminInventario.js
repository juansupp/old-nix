'use strict';
(function(){

	angular.module('nixApp')
	.config(function($stateProvider) {
		$stateProvider
		.state('m.adminInventario', {
			url: '/adminInventario',
			templateUrl: 'app/pages/inventario/adminInventario/adminInventario.html',
			controller: 'adminInventarioCtrl',
			controllerAs: 'vmai'
		});
	});
	
})();

