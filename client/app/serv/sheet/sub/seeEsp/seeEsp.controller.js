  angular.module('nixApp')
  .controller('seeEspCtrl',seeEspCtrl);

    seeEspCtrl.$inject = ['$scope','sheetService','bifrost'];

    function seeEspCtrl  ($scope,sheetService,bifrost) {
      console.log(sheetService.dataRow.id_activo);
      //$scope.especificaciones = sheetService.dataRow;
      bifrost.s().then(response=>{

      });
    }
