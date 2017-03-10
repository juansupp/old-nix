'use strict';

angular.module('nixApp')
  .controller('MconfCtrl', function ($scope,$rootScope,global,bifrost,$q) {
    $rootScope.tit='Configuración';
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      $scope.currentTab = toState.data.selectedTab;
    });

    $scope.esp = {campos : ''};

    $scope.submit = function(event) {
      $rootScope.showProg();
      var tar = event.currentTarget.name;
      if (tar == 'PF') {
        insert('prioridad', this.prioridad, {
          'nivel': this.prioridad.nivel
        });
      } else if (tar == 'MF') {
        insert('mesa_servicio', this.mesa, {
          'mesa': this.mesa.mesa
        });
      } else if (tar == 'OF') {
        insert('original', this.original, {
          'atencion': this.original.atencion
        });
      } else if (tar == 'SF') {
        insert('servicio', this.servicio, {
          'nombre_servicio': this.servicio.nombre_servicio
        });
      } else if (tar == 'AF') {
        insert('area', this.area, {
          'nombre_area': this.area.nombre_area
        });
      }
      else if (tar == 'TAF') {
        var tipo =  this.ta.nombre_tipo_activo;
        insert('tipo_activo', this.ta, this.ta).then(function(){
          var id  = '';
          bifrost.s({
            table : 'tipo_activo',
            val : 'id_tipo_activo',
            where : "nombre_tipo_activo =  '"+ tipo + "'"
          }).then(function(r){
            id = r[0].id_tipo_activo;
            if($scope.esp.campos!=''){
              $scope.esp.campos = $scope.esp.campos.replace(/,/g,'*');
              bifrost.i({
                table : 'espCampo',
                val : global.rQ([id,$scope.esp.campos])
              });
            }
            $scope.esp.campos = '';
          });
        });
      }
    };

    function insert(t, ob, vr) {
      return $q(function (resolve) {
        global.vR(vr, t).then(function(data) {
          if (data == 0) {
            var arr = [];
            for (var i in ob)
              arr.push(ob[i]);
            bifrost.i({
              table: t,
              val: global.rQ(arr)
            }).then(function(response) {
              global.notS(t+'Registrado satisfactoriamente.');
              $rootScope.hideProg();
              resolve(true);
            });
          } else {
            $rootScope.hideProg();
            global.not((data.replace('fk_id_', ' ')).replace('id_', ''));
            resolve(false);
          }
        });
      });

    }
  });
