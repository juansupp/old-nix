'use strict';

angular.module('nixApp')
  .controller('SolicitudCtrl', function($q, $scope, $rootScope, $location,
    bifrost, LxNotificationService, LxProgressService, LxDialogService, global, send) {
    $rootScope.tit = 'Solicitud de servicio';
    $scope.f = {
      r: '1'
    };
    $scope.arrT = {};
    $scope.sel = {};
    $scope.areaLista = false;

    function init() {
      //CARGA AREA
      $rootScope.cargaCombo(
        "area_sedes",
        "*",
        " fk_id_sede = " + global.gStor('fk_id_sede')
      ).then(function(r) {
        $scope.sel.area = r;
      });

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

    }
    init();
    //Le Tabler
    function cargarInventario(arg) {
      return $q(function(resolve) {
        bifrost.sParams({
          "table": "inventarioActivos",
          "val": arg.th,
          "where": "Placa_inv is " + arg.not + " null and id_area_sede =  " + $scope.f.area
        });
        bifrost.s().then(function(dat) {
          $scope.tFilter = arg.th.split(",");
          $scope.tHead = arg.head;
          $scope.tBody = dat;
          resolve("ya");
        });
      });
    };
    //Configuración inicial de la tabla
    $scope.tHead = ["init"];
    $scope.tFilter = ["init"];
    $scope.tBody = [{
      "init": "nuller"
    }];
    $scope.arrT = {
      activo: {
        'id_activo': 0
      }
    };
    $scope.changeSel = function(id) {
      $scope.arrT.activo = id;
    };
    //MUESTRA EL ACTIVO SEGUN EL RADIO ACTIVO
    $scope.$watch('f.r', function(value) {
      if (value == 1) {
        $scope.showAc = false;
        $scope.arrT.activo.id_activo = 0;
      } else if (value == 2) { //ACTIVO CLIENTE
        cargarInventario({
          "th": "id_activo,Activo,Serial,Marca,Modelo",
          "head": ["id_activo", "Activo", "Serial", "Marca", "Modelo"],
          "not": " "
        }).then(function(d) {
          $scope.showAc = true;
        });
      } else if (value == 3) { //ACTIVO PROPIO
        cargarInventario({
          "th": "id_activo,Activo,Serial,Marca,Modelo,Placa_inv,Placa_seguridad",
          "head": ["id_activo", "Activo", "Serial", "Marca", "Modelo", "Placa inv", "Placa seg"],
          "not": "not"
        }).then(function(d) {
          $scope.showAc = true;
        });
      }
    });


    $scope.crearSolicitud = function() {
      var f = $scope.f;
      console.log(f.area);
      if (global.vV($scope.f, 3)) {
        if (f.r != 1 && !$scope.arrT.activo)
          global.not('Debes seleccionar un activo, sí ningún activo interviene en el servicio debes seleccionar la opcion: sin activo.');
        else {
          if (!(f.area instanceof Object)) {
            bifrost.eE({
              Procedure: 'SolicitarTicket',
              val: global.rQ([
                f.area,
                f.desc,
                global.gStor('nombre_contacto'),
                $scope.arrT.activo.id_activo
              ])
            }).then(function(response) {
              bifrost.s({
                table: ' ticket',
                val: 'top(1) N_Ticket,id_ticket',
                where: "estado = 'S' order by N_Ticket desc"
              }).then(function(N) {
                var NT = N[0].N_Ticket;
                global.not('El servicio N°' + NT + ' ha sido registrado satisfactoriamente.');
                $scope.arrT.activo.id_activo = '0';
                $scope.f.desc = '';
                $scope.f.r = 1;
                $scope.f.area = {};
                $scope.areaLista = false;
              });
            });
          } else {
            global.not('Verifica que el formulario esté completo');
          }
        }
      } else
        global.not('Verifica que el formulario esté completo');
    };


    $scope.mu = function() {
      var f = $scope.f;
      if (f.area != undefined) {
        if (!(f.area instanceof Object)) {
          $scope.areaLista = true
        }
      }
    };
  });
