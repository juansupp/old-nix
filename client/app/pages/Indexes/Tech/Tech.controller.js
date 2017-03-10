'use strict';

angular.module('nixApp')
  .controller('TechCtrl', function($q, $scope, $rootScope, $location, $compile, //Variables
    bifrost, DTColumnBuilder, LxNotificationService, LxProgressService, LxDialogService,
    global, DTDefaultOptions, DTOptionsBuilder, $mdDialog, send) {
    $rootScope.tit = 'Inicio';


    function loadT(estado) {
      var val = [
        'N_Ticket',
        'id_ticket',
        'cliente',
        'prioridad',
        'fk_id_prioridad',
        'cast(fecha as varchar(20)) fecha '
      ];
      var w2 = ')';
      if (estado.length > 1) {
        w2 = ' or estado  = \'P\' )';
        estado = 'N';
      }
      var w = ' fk_id_persona =  ' + global.gStor('fk_id_persona') + ' and (estado = \'' + estado + '\' ' + w2;

      return $q(function(resolve, reject) {
        var option = DTOptionsBuilder.fromFnPromise(function() {
            return $q(function(resolve, reject) {
              bifrost.s({
                table: 'HistorialTicks',
                val: val,
                where: w
              }).then(function(data) {
                resolve(data);
              });
            });
          }).withPaginationType('full_numbers').withDisplayLength(10)
          .withOption('bLengthChange', false).withOption('order', [1, 'desc'])
          .withOption('createdRow', createdRow).withOption('info', false);
        //RETURN
        resolve(option);
      });
    }

    //Tabla 1 --Nuevos
    $scope.optNuevo = loadT('N,P');

    $scope.colNuevo = [
      DTColumnBuilder.newColumn('N_Ticket').withTitle('Nº ticket'),
      DTColumnBuilder.newColumn('cliente').withTitle('Cliente'),
      DTColumnBuilder.newColumn('fecha').withTitle('Creación'),
      DTColumnBuilder.newColumn(null).withTitle('').notSortable().renderWith(accion)
    ];

    $scope.insNuevo = {};
    // Tabla 2 --Pendiente
    $scope.optPendiente = loadT('V');

    $scope.colPendiente = [
      DTColumnBuilder.newColumn('N_Ticket').withTitle('Nº ticket'),
      DTColumnBuilder.newColumn('cliente').withTitle('Cliente'),
      DTColumnBuilder.newColumn('fecha').withTitle('Creación'),
      DTColumnBuilder.newColumn(null).withTitle('').notSortable().renderWith(accionEco)
    ];

    $scope.insPendiente = {};

    function accion(data) {
      var color = '';
      if (data.fk_id_prioridad == '1')
        color = 'blue';
      else if (data.fk_id_prioridad == '2')
        color = 'orange';
      else
        color = 'red';

      return "<button ng-click='openD(" + data.id_ticket + ")'" +
        " class='btn btn--m btn--" + color + " btn--icon' lx-ripple >" +
        "<i class='mdi mdi-pencil'  >" +
        "</i></button>";
    }

    function accionEco(data) {
      return "<button ng-click='eco($event," + data.N_Ticket + ")'" +
        " class='btn btn--m btn--blue btn--icon' lx-ripple  >" +
        "<i class='mdi mdi-send'  >" +
        "</i></button>";
    }

    function createdRow(row, data, dataIndex) {
      $compile(angular.element(row).contents())($scope);
    }
    //ACCIONES
    $scope.texto = '';
    $scope.doc = {
      id: ''
    };
    $scope.openD = function(id) {
      $scope.doc.id = id;
      bifrost.s({
        "table": "TextoInicialTicket",
        "val": "*",
        "where": "id_ticket = " + id
      }).then(function(reso) {
        $scope.texto = reso[0].texto;
        LxDialogService.open('panel');
      });
    };
    $scope.documentar = function() {
      if (global.vV($scope.doc, 3)) {
        $rootScope.showProg();
        var val = [
          $scope.doc.id,
          $scope.doc.texto,
          global.gStor("nombre")
        ];
        var procedure = "documentarTicketObservacion";
        if ($scope.doc.r !== 'O') {
          procedure = "documentarTicket"; // SOLUCION
          val.splice(2, 0, $scope.doc.r);
        }

        bifrost.sParams({
          "Procedure": procedure,
          "val": global.rQ(val)
        }).then(function() {
          bifrost.eE().then(function(data) {
            if (data) {
              global.notS('Documentado satisfactoriamente');
              reloadTable();
            }
          });
        });
      } else {
        global.not('Verifica que los campos no estén vacios');
      }
    };

    $scope.eco = function(ev, n) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .parent(angular.element(document.body))
        .title('¿Estás seguro de enviar un eco?')
        .content('Al enviar un eco se envia automaticamente un correo a soporte para que puedan verificar el cierre del ticket.')
        .ariaLabel('lobal')
        .ok('Enviar eco')
        .cancel('Cancelar')
        .targetEvent(ev);
      $mdDialog.show(confirm).then(function() {
        $rootScope.showProg();
        send.eco(n).then(function() {
          $rootScope.hideProg();
        });
      });
    };


    function reloadTable() {
      LxDialogService.close("panel");
      $scope.doc.texto = '';
      var resetPaging = false;
      $scope.insNuevo.reloadData(callback, resetPaging);
      $scope.insPendiente.reloadData(callback, resetPaging);
    }

    function callback(json) {
      $rootScope.hideProg();
    }
    //INIT
    //Tickets cerrados
    $scope.tCerrados = {};

    function init() {
      bifrost.rE({
        Procedure: 'Cerrados_Tecnico',
        val: global.gStor('fk_id_persona')
      }).then(function(response) {
        $scope.tCerrados = response[0];
      });
    }
    init();
  });
