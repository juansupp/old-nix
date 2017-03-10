'use strict';

angular.module('nixApp')
  .controller('AdminCtrl', function($q, $scope, $rootScope, $location, $compile, //Variables
    bifrost, DTColumnBuilder, LxNotificationService, LxProgressService, LxDialogService,
    global, DTDefaultOptions, DTOptionsBuilder, $mdDialog, send,$state) {
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
      var w = '(estado = \'' + estado + '\' ' + w2;

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

    function loadS() {

      return $q(function(resolve, reject) {
        var option2 = DTOptionsBuilder.fromFnPromise(function() {
            return $q(function(resolve, reject) {
              bifrost.s({
                table: 'T_Solicitados',
                val: '*'
              }).then(function(data) {
                resolve(data);
              });
            });
          }).withPaginationType('full_numbers').withDisplayLength(10)
          .withOption('bLengthChange', false).withOption('order', [1, 'desc'])
          .withOption('createdRow', createdRow).withOption('info', false);
        //RETURN
        resolve(option2);
      });
    }


    //Tabla 1 --Solicituds
    $scope.optSolicitud = loadS();

    $scope.colSolicitud = [
      DTColumnBuilder.newColumn('N_Ticket').withTitle('Nº ticket'),
      DTColumnBuilder.newColumn('cliente').withTitle('Cliente'),
      DTColumnBuilder.newColumn('fecha_creacion').withTitle('Creación'),
      DTColumnBuilder.newColumn(null).withTitle('').notSortable().renderWith(btnCreate)
    ];

    $scope.insSolicitud = {};
    // Tabla 2 --Pendiente
    $scope.optPendiente = loadT('V');

    $scope.colPendiente = [
      DTColumnBuilder.newColumn('N_Ticket').withTitle('Nº ticket'),
      DTColumnBuilder.newColumn('cliente').withTitle('Cliente'),
      DTColumnBuilder.newColumn('fecha').withTitle('Creación'),
      DTColumnBuilder.newColumn(null).withTitle('').notSortable().renderWith(btnClose)
    ];

    $scope.insPendiente = {};

    function btnClose(data) {
      return "<button ng-click='showCloseTicket(" + data.id_ticket + ")'" +
        " class='btn btn--m btn--blue btn--icon' lx-ripple lx-tooltip='Cerrar' >" +
        "<i class='mdi mdi-check-all'  >" +
        "</i></button>";
    }

    function btnCreate(data) {
      return "<button ng-click='createTicket(" + data.id_ticket + ")'" +
        " class='btn btn--m btn--blue btn--icon' lx-ripple lx-tooltip='Crear ticket' >" +
        "<i class='mdi mdi-bookmark-outline'  >" +
        "</i></button>";
    }

    $scope.TD = {
      cerrar: {
        texto: ''
      }
    };

    //ACICIONES
    var leID = '';
    $scope.showCloseTicket = function(id) {
      leID = id;
      LxDialogService.open("panel");
      var preguntasR = {};

      bifrost.sParams({
        "table": "pregunta",
        "val": "*",
      }).then(function() {
        bifrost.s().then(function(data) {
          preguntasR = data;
          bifrost.sParams({
            "table": "respuestasPosibles",
            "val": "*"
          }).then(function() {
            bifrost.s().then(function(resp) {
              var respuestasR = resp;
              for (var i = 0; i < preguntasR.length; i++) {
                var arrResp = [];
                for (var x = 0; x < respuestasR.length; x++)
                  if (preguntasR[i].id_pregunta == respuestasR[x].fk_id_pregunta)
                    arrResp.push(respuestasR[x]);
                preguntasR[i].respuestas = arrResp;
                if ((preguntasR.length - 1) == i) {
                  $scope.TD.cerrar = {
                    "encuesta": preguntasR,
                    "texto": undefined
                  };
                  for (var i = 0; i < 3; i++)
                    $scope.TD.cerrar.encuesta[i].Respuesta = undefined;
                }
              }
            });
          });
        });
      });
    };


    $scope.closeTicket = function() {
      var arrEnc = $scope.TD.cerrar.encuesta;
      var valido = true;
      for (var i = 0; i < arrEnc.length; i++) {
        if (!arrEnc[i].Respuesta) {
          valido = false;
          break;
        }
      }
      if (!valido || !$scope.TD.cerrar.texto)
        global.not('Verifica que todo esté en orden');
      else {
        bifrost.sParams({
          "Procedure": "cerrarTicket",
          "val": global.rQ([
            leID,
            $scope.TD.cerrar.texto,
            global.gStor('nombre')
          ])
        }).then(function() {
          bifrost.eE().then(function(bol) {
            if (bol) {
              reloadTable();
              global.notS('Cierre exitoso');
            } else
              global.not('Comprueba tu conexión a internet')
          });
        });
      }
    };


    $scope.createTicket = function(id) {
      bifrost.s({
        table : 'ticket',
        val : '*',
        where : 'id_ticket = '+id
      }).then(function(r){
        var ob = JSON.stringify(r[0]);
        $state.go('m.newTicket', {
          't': ob
        });
      });
    };
    //RENDER FUNCTIONS
    function createdRow(row, data, dataIndex) {
      $compile(angular.element(row).contents())($scope);
    }

    function reloadTable() {
      LxDialogService.close("panel");
      var resetPaging = false;
      $scope.insSolicitud.reloadData(callback, resetPaging);
      $scope.insPendiente.reloadData(callback, resetPaging);
    }

    function callback(json) {
      $rootScope.hideProg();
    }
  });
