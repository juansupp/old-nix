'use strict';

angular.module('nixApp')
  .controller('LoginCtrl', function($scope, $rootScope, $http, $state, $location, /*service*/ bifrost, global, LxNotificationService) {
    $rootScope.tit = 'Login';
    $scope.data = {};
    $scope.login = function() {
      $rootScope.showProg();
      bifrost.s({
        'table': 'UsuarioPersona',
        'val': ' * ',
        'where': ' nickname =  \'' + $scope.data.usu + '\' and contrasena = \'' + $scope.data.pass + '\' '
      }).then(function(dat) {
        if (dat[0]) {
          global.sStor(dat[0]).then(function() {
            global.dStor('contrasena');

            if ($scope.chGuardar) {
              global.sStor({
                'usuario': $scope.data.usu
              });
            }

            $rootScope.per = $rootScope.firstName();
            var ind = '';
            if (dat[0].fk_id_rol == 1)
              ind = 'm.Master';
            else if (dat[0].fk_id_rol == 6)
              ind = 'm.admin'
            else if (dat[0].fk_id_rol == 5)
              ind = 'm.Tech'

            global.sStor({
              'index': ind
            }).then(function() {
              $rootScope.hideProg();
              $state.go(ind);
            });

          });
        } else {

          bifrost.s({
            table: 'contacto',
            val: '*',
            where: "usuario = '" + $scope.data.usu + "' and contrasena = '" + $scope.data.pass + "' "
          }).then(function(response) {
            $rootScope.hideProg();
            if (response[0]) {

              global.sStor(response[0]).then(function() {
                global.sStor({
                  'index': 'm.client',
                  'fk_id_rol' : '7'
                }).then(function() {
                  $rootScope.hideProg();
                  $state.go('m.client');
                });
              });
            } else {
              LxNotificationService.warning('Credenciales incorrectas');
            }
          });
        }
      });
    };
  });
