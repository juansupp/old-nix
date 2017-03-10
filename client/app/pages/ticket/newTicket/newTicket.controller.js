'use strict';

angular.module('nixApp')
  .controller('NewTicketCtrl', function($q, $scope, $rootScope, $location,
    bifrost, LxNotificationService, LxProgressService, LxDialogService, global, send, $stateParams) {
    $rootScope.tit = "Nuevo ticket";
    //ACTIVAR EL MENU BAR
    //$rootScope.menuVisible($location.$$path);

    $scope.prueba='';
    $scope.pruebaFun = function(){
        console.log('hola');
    }
    

    //INICIA EN CONTROLADOR
    function init_controller() {
      return $q(function(resolve) {
        //Desactivado por defecto el t.active
        $scope.t = {
          active: false
        };
        //Activa el boton de creación
        $scope.createTciketProcess = false;
        //DESACTIVA LAS OPCIONES DE RADIO BUTTON
        $scope.areaLista = false;
        //OBJETO SEL CARGA DE COMBOS
        $scope.sel = {};
        // OBJETO ARRT = ArrayTicket = Objeto de descarga
        $scope.arrT = {
          activo: {
            id_activo: "1",
            tipo_activo: "No"
          }
        };
        //OBJETO DE RADIOS
        $scope.r = 1;
        //MUESTRA LOS ACTIVOS
        $scope.showAc = false;
        // MODELO DT PARA TABLA
        $scope.dt = {};
        //carga COMBOS
        $rootScope.cargaCombo("servicio", "*").then(function(r) {
          $scope.sel.servicio = r;
        });
        $rootScope.cargaCombo("mesa_servicio", "*").then(function(r) {
          $scope.sel.mesa = r;
        });
        $rootScope.cargaCombo("prioridad", "*").then(function(r) {
          $scope.sel.prioridad = r;
        });
        $rootScope.cargaCombo("tecnicos", "*").then(function(r) {
          $scope.sel.tecnico = r;
        });
        $rootScope.cargaCombo("empresa_sede", "*").then(function(r) {
          $scope.sel.sede = r;
        });
        $rootScope.cargaCombo("original", "*").then(function(r) {
          $scope.sel.original = r;
        });

        if ($stateParams.t.length > 0) {
          $scope.t.active = true;
          var t = JSON.parse($stateParams.t);
          $scope.arrT = t;
          if (t.fk_id_activo != 1) {
            bifrost.s({
              table: 'inventarioActivos',
              val: '*',
              where: 'id_activo = ' + t.fk_id_activo
            }).then(function() {

            });
          }
        }
        resolve('return');
      });
    }
    //Inicia por primera vez en controlador
    init_controller();
    //SCOPE FUNCTIONES
    $scope.cargaAreas = function(newV) {
      $scope.arrT.area = undefined;
      $scope.arrT.usuario = undefined;
      var id_sede = newV.newValue.id_sede;
      $rootScope.cargaCombo("area_sedes", "*", " fk_id_sede = " + id_sede).then(function(r) {
        $scope.sel.area = r;
        $rootScope.cargaCombo("sede_contacto", "*", " fk_id_sede = " + id_sede).then(function(r) {
          $scope.sel.usuario = r;
        });
      });
      
    };
    //VERIFICAR SI HAY AREA
    $scope.$watch('arrT.area', function(value) {
      if (!value) {
        $scope.areaLista = false;
        $scope.showAc = false;
        $scope.r = 1;
      }
    });
    //cuando cambia area activo radios
    $scope.changeArea = function(value) {
        $scope.r = 1;
        $scope.areaLista = true;
      }
      //-----------------------------------------------------------------------------------------------------------------------TABLA
      //CARGA INVENTARIO sea propio o del cliente
    function cargarInventario(arg) {
      return $q(function(resolve) {
        bifrost.sParams({
          "table": "inventarioActivos",
          "val": arg.th,
          "where": "Placa_inv is " + arg.not + " null and id_area_sede =  " + $scope.arrT.area.id_area_sede
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
    $scope.arrT.activo = 0;
    $scope.changeSel = function(id) {
      $scope.arrT.activo = id;
    };
    //MUESTRA EL ACTIVO SEGUN EL RADIO ACTIVO
    $scope.$watch('r', function(value) {
      if (value == 1) {
        $scope.showAc = false;
        $scope.arrT.activo = 0;
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
    //OPEN PPICKER CON PRIORIDAD
    $scope.openDateP = function() {
      var el = document.getElementById('fecha');
      angular.element(el).triggerHandler('click');
    };
    //CONFIRMACION ACTIVO
    $scope.showConfirm = function() {
      global.rNT().then(function(n) {
        $scope.n_ticket = n;
        $scope.NN = parseInt(n) + 1;
        console.log($scope.arrT);
        if (Object.keys($scope.arrT).length > 10)
          if ($scope.r == 1) { //SIN ACTIVO
            LxDialogService.open('confirm');
          } else { // CON ACTIVO
            if ($scope.arrT.activo == 0) //ACTIVO NO SELECCIONADO
              LxNotificationService.warning('Debes seleccionar un activo');
            else // ACTIVO SELECCIONADO
              LxDialogService.open('confirm');
          }
        else
          LxNotificationService.warning('Debes completar el formulario para poder crear el ticket');
      });
    };

    // ACEPTAR ACTIVO
    $scope.createTciketProcess = false;
    $scope.createTicket = function(){
      $scope.createTciketProcess  = true;
      LxProgressService.circular.show('#5fa2db', '#progress');
      if ($scope.arrT.activo === 0)
        $scope.arrT.activo = {
          "id_activo": "1"
        };

      var dat = $scope.arrT;
      //Date Now
      var dN = new Date();
      var uStor = global.gStor(["id_usuario", "nombre"]);
      var nombre_persona = uStor.nombre;
      var id_usuario = uStor.id_usuario;
      var hora = dN.getHours() + ":" + dN.getMinutes();
      //Fecha Config
      var fecha = global.cD(dat.fecha);

      bifrost.sParams({
        "Procedure": "RealizarTicket",
        "val": global.rQ([
          dat.mesa.mesa,
          dat.descripcion,
          fecha,
          dat.original.atencion,
          dat.descripcion,
          dat.tecnico.id_persona,
          id_usuario,
          dat.area.id_area0_sede,
          dat.prioridad.id_prioridad,
          hora,
          dat.activo.id_activo,
          dat.servicio.id_servicio,
          nombre_persona
        ])
      });
      bifrost.eE().then(function(res) {
        //FIRMA
        var id_contacto = dat.usuario.id_contacto;
        var id_ticket = '';
        global.rNT().then(function(n) {
          bifrost.s({
            table: 'ticket',
            val: 'id_ticket',
            where: 'N_Ticket = ' + n
          }).then(function(id_t) {
            id_ticket = id_t[0].id_ticket;

            bifrost.i({
              table: 'firmaTicket',
              val: id_ticket + ',NULL,' + id_contacto
            }).then(function(bl) {
              //renicio en controlador
              LxDialogService.close('confirm');
              init_controller().then(function() {
                dat.sede["usuario"] = dat.usuario.nombre_contacto;
                if (!dat.activo.serial)
                  dat.activo["tipo_activo"] = 'No';
                send.nt({
                  toC: dat.usuario.correo,
                  toT: dat.tecnico.correo,
                  body: {
                    n: n,
                    fecha: fecha,
                    cliente: dat.sede,
                    tipo_servicio: dat.servicio.nombre_servicio,
                    activo: dat.activo,
                    descripcion: dat.descripcion,
                    tecnico: {
                      nombre: dat.tecnico.nombre
                    }
                  }
                });
                /*.then(function() {
                                  LxProgressService.circular.hide();
                                  LxNotificationService.success('¡El ticket se ha realizado!');
                                });*/
                LxProgressService.circular.hide();
                LxNotificationService.success('¡El ticket se ha realizado!');

              });
            });
          });
        });
      }, function(err) {
        LxProgressService.circular.hide();
        LxNotificationService.warning('¡Algo ha fallado!');
      });
    };
  });
