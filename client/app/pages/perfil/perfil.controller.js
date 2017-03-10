'use strict';

angular.module('nixApp')
  .controller('PerfilCtrl', function($scope, global, bifrost, $rootScope) {
    $rootScope.tit = 'Perfil';
    $scope.message = 'Perfil';
    $scope.PC = {};
    $scope.UC = {};



    $scope.guardarPerfil = function() {
      var pc = $scope.PC,
          uc = $scope.UC;
      var id_pc = $scope.PC.id_persona,
          id_uc = $scope.UC.id_usuario;

      delete pc.id_persona;
      delete uc.id_usuario;

      $rootScope.newU({
        table: 'persona',
        vV: {
          form: pc,
          cant: 3
        },
        vR: {
          form: {
            telefono: pc.telefono
          },
          where: ' and id_persona <> ' + id_pc
        },
        u: {
          val : pc,
          where : 'id_persona  =' +id_pc
        }
      }).then(function(resp) {

        $rootScope.newU({
          table: 'usuario',
          vV: {
            form: uc,
            cant: 2
          },
          vR: {
            form: {
              nickname: uc.nickname
            },
            where: ' and id_usuario <> ' + id_uc
          },
          u: {
            val : uc,
            where : 'id_usuario  =' + id_uc
          },
          where: ' id_usuario = ' + id_uc
        }).then(function(resp2) {
          init();
          global.notS('Guardado satisfactoriamente');
        });
      });
    };
    // INIT
    function init() {
      bifrost.s({
        table: 'usuario',
        val: '*',
        where: 'id_usuario = ' + global.gStor('id_usuario')
      }).then(function(resp) {
        $scope.UC = resp[0];
        bifrost.s({
          table: 'persona',
          val: '*',
          where: 'id_persona = ' + $scope.UC.fk_id_persona
        }).then(function(respU) {
          $scope.PC = respU[0];
        });
      });
    }
    init();
  });
