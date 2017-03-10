'use strict';

angular.module('nixApp')
  .controller('MasterCtrl', function(bifrost, $scope, $rootScope, global, charts,
    LxDialogService, LxNotificationService) {
    $rootScope.tit = 'Inicio';
    //
    $scope.MC = {}; //MASTER CONTROLLER
    $scope.MC.CTET = {}; //Chart Ticket x Estado x Tecnico
    $scope.MC.TTG = {}; // Total tickets creados en fechas
    $scope.MC.TCC = {}; // Total tickets cerrados en fechas
    $scope.sel = {}; // CARGA SEL
    $scope.fil = {};
    //TTG
    $scope.fil.TTG = {};
    $scope.fil.TTG.year = '2015';
    $scope.fil.TTG.month = false;
    //TCC
    $scope.fil.TCC = {};
    $scope.fil.TCC.year = '2015';
    $scope.fil.TCC.month = false;
    //Det primeros 3 informes
    $scope.det = {};
    //
    $scope.sel.sede = {};

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

    $scope.loadEstado = function() {
      charts.oCE({
        table: 'tecnicos',
        label: 'nombre',
        id: 'id_persona'
      }).then(function(ch) {
        $scope.MC.CTET = { //Chart Ticket x Estado x Tecnico
          'labels': ch.labels,
          'data': ch.data,
          'series': ch.series
        };
      });
    };

    $scope.load = function() {
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
      //carga det top
      bifrost.rE({
        Procedure: 'eTicketos',
        val: " '1','1','1=1'"
      }).then(function(response) {
        console.log(response);
        $scope.det = response[0];
      });

    };
    //Watchers

    $scope.filterCreados = function(m, s) {
      var y = $scope.fil.TTG.year;
      var sede = '';
      if (!s)
        sede = retorno_sede();
      else
        sede = s;
      var arr = [sede, y];
      if (m) {
        arr.push(m);
        $scope.loadCreados('Mes', arr);
      } else
        $scope.loadCreados('Ano', arr);
    };

    $scope.filterCerrados = function(m, s) {
      var y = $scope.fil.TTG.year;
      var sede = '';
      if (!s)
        sede = retorno_sede();
      else
        sede = s;
      var arr = [sede, 'S', y];
      var arrR = [sede, 'R', y];
      if (m) {
        arr.push(m);
        arrR.push(m);
        $scope.loadCerrados('Mes', arr, arrR);
      } else
        $scope.loadCerrados('Ano', arr, arrR);
    };

    $scope.filterSede = function(val) {
      if ($scope.fil.TTG.month)
        $scope.filterCreados($scope.fil.TTG.month, val.newValue.id_sede);
      else
        $scope.filterCreados(false, val.newValue.id_sede);

      if ($scope.fil.TCC.month != undefined)
        $scope.filterCerrados($scope.fil.TCC.month, val.newValue.id_sede);
      else
        $scope.filterCerrados(false, val.newValue.id_sede);

    };

    function retorno_sede() {
      var sede = $scope.fil.sede;
      if (!sede)
        sede = 0;
      else
        sede = sede.id_sede;
      return sede;
    }
    //INIT
    $scope.loadCreados('Ano', ['0', '2015']);
    $scope.loadCerrados('Ano', ['0', 'S', '2015'], ['0', 'R', '2015']);
    $scope.loadEstado();
    $scope.load();
  });
