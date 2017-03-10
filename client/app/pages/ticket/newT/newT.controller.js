'use strict';
(function(){

  angular.module('nixApp').controller('newTCtrl',newTCtrl);

  newTCtrl.$inject = ['$scope','selectService','bifrost'];

  function newTCtrl($scope,selectService,bifrost) {
    init();
    var vmnt = this;
    //variables
    vmnt.tipoTicket = 'servicio';
    vmnt.form = new Object();
    vmnt.data = new Object();
    vmnt.activos = new Object;
    vmnt.activos.de = new Array();
    vmnt.activos.para = new Array();
    //funciones
    vmnt.confirmar = confirmar;
    /*for (var i = 1; i <= 15; ++i) {
        vmnt.models.lists.A.push({label: "Item A" + i});
    }*/

    // Model to JSON for demo purpose
    $scope.$watch('vmnt.activos', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);


    function confirmar(){
      //OPEN A DIALOG

    }


    function init(){
      //Se cargan los activos {De}
      var ob = {
        table : 'activo',
        val : '*'
      };

      bifrost.s(ob).then(response=>{

      });

    }

  }
})();
