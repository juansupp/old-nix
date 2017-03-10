'use strict';

(function() {

  angular.module('nixApp')
    .controller('adminTCtrl', adminTCtrl);

  adminTCtrl.$inject = ['sheetService'];

  function adminTCtrl(sheetService) {
    var vmat = this;
    vmat.rowClick = rowClick;

    function rowClick(dat) {
      var ter = [{
        name: 'Documentar ticket',
        icon: 'create'
      }, {
        name: 'Escalar ticket',
        icon: 'trending_up'
      }, {
        name: 'Ver historico',
        icon: 'history'
      }, {
        name: 'Cambio de estado',
        icon: 'hdr_strong'
      }, {
        name: 'Ver detalles',
        icon: 'info_outline'
      }, {
        name: 'Cerrar ticket',
        icon: 'gavel'
      }];
      sheetService.show(ter);
    }

    vmat.struct = {
      table: 'adminTickets',
      columns: [
        //
        {
          c: null,
          t: '',
          r: estado,
          o: [{
            op: 'sWidth',
            val: '2%'
          }]
        }, {
          c: 'N_Ticket',
          t: 'N° ticket'
        }, {
          c: 'nombre_empresa',
          t: 'Cliente'
        }, {
          c: 'nombre_contacto',
          t: 'Usuario'
        }, {
          c: 'nombre_servicio',
          t: 'Servicio'
        }, {
          c: 'nombre_persona',
          t: 'Técnico'
        }, {
          c: 'fecha_creacion',
          t: 'Creación'
        }

      ]
    }

    function estado(data, type, full, meta) {
      return ' <div class="estadoColor ' + data.estado + ' "></div>';
    }

  }

})();
