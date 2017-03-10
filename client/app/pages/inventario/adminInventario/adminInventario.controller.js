'use strict';
(function() {
  angular.module('nixApp')
    .controller('adminInventarioCtrl', adminInventarioCtrl)

  adminInventarioCtrl.$inject = ['$scope', '$rootScope', 'sheetService'];

  function adminInventarioCtrl($scope, $rootScope, sheetService) {

    var vmai = this;
    vmai.rowClick = rowClick;
    vmai.activoSeleccionado = '';
    vmai.bindingForm = bindingForm;
    vmai.variablesForm = new Object();
    vmai.step = 1;

    /*
       @Overwrite
      rowClick provides the tabler directive
       !!! Don't change this function name !!!
      */
    function rowClick(data) {
      var ter = [{
        name: 'Ver especificaciones',
        icon: 'list',
        action: 'seeEsp',
        data: data
      }, {
        name: 'Ir a hoja de vida',
        icon: 'history',
        action: 'redirectHoja',
        data: data
      }, {
        name: 'Editar activo',
        icon: 'mode_edit',
        action: 'seeActivo',
        data: data
      }];

      sheetService.showSheet(ter);
      $scope.$apply(function() {
        vmai.step = 1;
        var _serial = data.serial;
        vmai.activoSeleccionado = '...' + _serial.substr(_serial.length - 6);
        vmai.variablesForm.key = data.id_activo;

      });
    }

    //Binding the type and the table variables to the former directive
    function bindingForm(type, table) {
      //Binding the variables
      vmai.variablesForm.type = type;
      vmai.variablesForm.table = table;
      //Finally the card shows the form
      vmai.step = 2;
    }

    vmai.struct = {
      table: 'inventario',
      columns: [{
          c: 'nombre_tipo_activo',
          t: 'Activo',
          o: [{
            op: 'sWidth',
            val: '15%'
          }]
        }, {
          c: 'serial',
          t: 'Serial'
        }, {
          c: 'placa_inv',
          t: 'Inventario',
          o: [{
            op: 'sWidth',
            val: '10%'
          }]
        }, {
          c: 'placa_seguridad',
          t: 'Seguridad',
          o: [{
            op: 'sWidth',
            val: '10%'
          }]
        }, {
          c: 'modelo',
          t: 'Modelo'
        }, {
          c: 'cliente',
          t: 'Lugar'
        }
        //{c: null, t : '' , r : accionesColumn}
      ]
    }

  }

})();
