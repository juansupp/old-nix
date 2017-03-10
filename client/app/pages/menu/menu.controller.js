'use strict';

angular.module('nixApp')
  .controller('MenuCtrl', function ($scope,$rootScope, $state,$location,$timeout,
    $mdSidenav,$q, $mdUtil, $log,bifrost,DTDefaultOptions,DTOptionsBuilder,global ) {

   //Cerrar sesión
    $scope.closeSession = function () {
      /*LxNotificationService.confirm('¿Deseas cerrar sesión?', 'Se perderá el cahcé ' +
      'y las preferencias', { cancel:'Cancelar', ok:'Aceptar' },
      function(answer){
        if (answer) {

        }
      });*/
      global.dStor(['index','fk_id_rol','id_rol','fk_id_persona','id_usuario']);
      $state.go('login');
    };
    //

    $rootScope.cargar = false;

    $scope.index = function(){
      $state.go(global.gStor('index'));
    };

    function visibleRol (arr){
      var visible = false;
      var miRol = global.gStor('fk_id_rol');
      for (var i = 0; i < arr.length; i++)
        if(miRol == arr[i]){
          visible = true;
          break;
        }

      return visible;
    }

    $scope.menuHeads = [
      {
        'title': 'Ticket',
        show : true,
        'menuItems': [{
          'title' : 'Nuevo',
          'url' : 'm.newTicket',
          'icon' : 'add',
          show : visibleRol([1,6])
        },{
          'title' : 'Gestión',
          icon : 'content_paste',
          'url' : 'm.adminTicket',
          show : visibleRol([1,6,5,7])
        },{
          'title' : 'Solicitar servicio',
          'url' : 'm.solicitud',
          show : visibleRol([7])
        },{
          'title' : 'Resportes',
          'url' : '',//'m.resportesTicket',
          show : true
        }]
      },{
        'title': 'Inventario',
        show : true,
        'menuItems': [{
          'title' : 'Gestión',
          'url' : 'm.newActive',
          'icon' : 'reorder',
          show : visibleRol([1,6,7])
        },{
          'title' : 'Administrar activos',
          'url' : 'm.adminActive',
          'icon':'description',
          show : visibleRol([1,6,7])
        }]
      },{
        'icon' : 'book',
        'title': 'Clientes',
        'url' : 'm.mc.addC',
        show : visibleRol([1,6])
      },{
        'icon' : 'key',
        'title': 'Usuarios',
        'url' : 'm.mu.addU',
        show : visibleRol([1])
      }
    ];

    $scope.serf = function(s){
      $state.go(s);
    };
    ///MENU SIDEBAR
    $scope.SinMenu = function () {
      return false;
    };
    $scope.isActive = function(route) {
      return route === $location.path();
    };


  });
