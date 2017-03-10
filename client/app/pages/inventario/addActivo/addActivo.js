'use strict';

(function(){

  angular.module('nixApp')
    .config(function($stateProvider){
      $stateProvider.state('m.addActivo',{
        url :'/addActivo',
        templateUrl : 'app/pages/inventario/addActivo/addActivo.html',
        controller : 'addActivoCtrl',
        controllerAs : 'vmaa'
      });
    });
})();
