'use strict';

angular.module('nixApp')
	.controller('sheetCtrl',sheetCtrl);

	sheetCtrl.$inject = ['$scope','btnes','sheetService'];
	function sheetCtrl ($scope,btnes,sheetService) {
		//render
		$scope.items = btnes;

    for (var i =  0; i < btnes.length; i++ )
      sheetService.dataRow =  btnes[i].data;

		$scope.action = function(ev){
			sheetService.showDialog(ev);
		}
	}
