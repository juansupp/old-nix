'use strict';

angular.module('nixApp')
  .controller('ClientCtrl', function($scope, $rootScope, charts, bifrost, global, $q,
    DTOptionsBuilder, DTColumnBuilder, $compile, send,$mdDialog) {
    $rootScope.tit = 'Inicio';
    var sc = this;
    $scope.MC = {}; //MASTER CONTROLLER
    $scope.MC.CTET = {}; //Chart Ticket x Estado x Tecnico
    $scope.MC.TTG = {}; // Total tickets creados en fechas
    $scope.MC.TCC = {}; // Total tickets cerrados en fechas
    $scope.sel = {}; // CARGA SEL
    $scope.fil = {};
    $scope.fil.sede = '0';
    //TTG
    $scope.fil.TTG = {};
    $scope.fil.TTG.year = '2015';
    $scope.fil.TTG.month = false;
    //TCC
    $scope.fil.TCC = {};
    $scope.fil.TCC.year = '2015';
    $scope.fil.TCC.month = false;

    bifrost.s({
      table: 'Anios_consumidos',
      val: '*'
    }).then(function(response) {
      $scope.sel.Years = response;
    });

    bifrost.s({
      table: 'Meses_consumidos',
      val: '*'
    }).then(function(response) {
      $scope.sel.Months = response;
    });

    $scope.loadCerrados = function(p, arr, arrR) {
      charts.oCD([{
        Proc: 'Cierre_Ticket_' + p,
        params: arr
      }, {
        Proc: 'Cierre_Ticket_' + p,
        params: arrR
      }], [
        "Cerrados en sitio",
        "Cerrados remotamente"
      ], 3).then(function(ch) {
        $scope.MC.TCC = { //Chart Ticket x Estado x Tecnico
          'labels': ch.labels,
          'data': ch.data,
          'series': ch.series
        };
      });
    };

    $scope.filterCreados = function(m) {
      var y = $scope.fil.TTG.year,
        sede = global.gStor('fk_id_sede');
      var arr = [sede, y];
      if (m) {
        arr.push(m);
        $scope.loadCreados('Mes', arr);
      } else
        $scope.loadCreados('Ano', arr);
    };

    $scope.filterCerrados = function(m) {
      var y = $scope.fil.TTG.year,
        sede = global.gStor('fk_id_sede');
      var arr = [sede, 'S', y];
      var arrR = [sede, 'R', y];
      if (m) {
        arr.push(m);
        arrR.push(m);
        $scope.loadCerrados('Mes', arr, arrR);
      } else
        $scope.loadCerrados('Ano', arr, arrR);
    };

    function loadS() {

      return $q(function(resolve, reject) {
        var option2 = DTOptionsBuilder.fromFnPromise(function() {
            return $q(function(resolve, reject) {
              bifrost.s({
                table: 'T_Solicitados',
                val: '*',
                where: 'fk_id_sede  =' + global.gStor('fk_id_sede')
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
      DTColumnBuilder.newColumn(null).withTitle('').notSortable().renderWith(btnEco)
    ];

    $scope.insSolicitud = {};

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

    function btnEco(data) {
      return "<button ng-click='eco($event," + data.N_Ticket + ")'" +
        " class='btn btn--m btn--blue btn--icon' lx-ripple lx-tooltip='Enviar eco' >" +
        "<i class='mdi mdi-send'  >" +
        "</i></button>";
    }
    $scope.eco = function(ev,n) {

      var confirm = $mdDialog.confirm()
      .title('¿Estás seguro de enviar un eco?')
      .content('Al enviar un eco se envia automaticamente un correo a soporte para que puedan verificar la creación del ticket N°'+n)
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Aceptar')
        .cancel('Cancelar');
      $mdDialog.show(confirm).then(function() {
        send.ecoS({
          n: n
        }).then(function(){
          global.notS('Correo enviado satisfactoriamente a soporte.');
        });
      }, function() {

      });
    };
    //INIT
    $scope.loadCreados = function(p, arr) {
      charts.oCD([{
        Proc: 'Creacion_Ticket_' + p,
        //Proc : fil.proc,
        params: arr
      }], [], 2).then(function(ch) {
        $scope.MC.TTG = { //Chart Ticket x Estado x Tecnico
          'labels': ch.labels,
          'data': ch.data,
          'series': ch.series
        };
      });
    };
    $scope.loadCreados('Ano', [global.gStor('fk_id_sede'), '2015']);
    $scope.loadCerrados('Ano', [global.gStor('fk_id_sede'), 'S', '2015'], [global.gStor('fk_id_sede'), 'R', '2015']);
  });
