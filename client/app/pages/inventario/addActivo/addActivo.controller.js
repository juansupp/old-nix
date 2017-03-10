'use strict';
(function(){

  angular.module('nixApp')
    .controller('addActivoCtrl', addActivoCtrl);

    addActivoCtrl.$inject = ['bifrost'];

    function addActivoCtrl(bifrost) {
      var vmaa = this;
      vmaa.model = new Object();
      vmaa.newActivo = newActivo;

      function newActivo (ev,frm){

        console.log(vmaa.model)


      }





    }
})();
