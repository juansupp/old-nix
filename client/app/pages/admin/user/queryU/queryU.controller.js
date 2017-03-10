'use strict';

angular.module('nixApp')
  .controller('QueryUCtrl', function (
    $q,$scope,$rootScope,$location,$compile,bifrost,DTColumnBuilder,
    LxNotificationService,LxProgressService,LxDialogService,global,
    DTDefaultOptions,DTOptionsBuilder) {
      $scope.QU = {};
      $scope.QU.usuario = {'rol2' :{}};
      bifrost.s({
        'table':'rol',
        'val' : '*'
      }).then(function(response){
        $scope.sRol = response;
      });
      ////CARGA DE TABLA
      $scope.option =  DTOptionsBuilder.fromFnPromise(function() {
        return $q(function(resolve,reject){
          bifrost.s({
            'table' : 'UsuarioPersona',
            'val' : ' * '
          }).then(function(data){
            resolve(data);
          });
        });
      }).withPaginationType('full_numbers').withColumnFilter().withDisplayLength(30)
        .withOption('bLengthChange',false).withOption('order', [1, 'desc'])
        .withOption('createdRow', createdRow).withOption('rowCallback',rowCallback);

        function reloadData() {
          LxDialogService.close("dial");
          $scope.dtInstance.reloadData(callback, false);
        }

        function callback(json) {
            console.log(json);
        }
        $scope.dtInstance = {};
      //ORDEN DE COLUMNAS
       $scope.dtColumns = [
          DTColumnBuilder.newColumn('nombre').withTitle('Usuario'),
          DTColumnBuilder.newColumn('telefono').withTitle('Telefono'),
          DTColumnBuilder.newColumn('correo').withTitle('Correo'),
          DTColumnBuilder.newColumn('nickname').withTitle('Nickname'),
          DTColumnBuilder.newColumn('contrasena').withTitle('Contraseña'),
          DTColumnBuilder.newColumn('nombre_rol').withTitle('Rol'),
       ];

     //INICIO DE TABLA
     function createdRow(row, data, dataIndex) {
        $compile(angular.element(row).contents())($scope);
      }

      function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
       $('td', nRow).unbind('dblclick');
       $('td', nRow).bind('dblclick', function() {
         LxDialogService.open('dial');
         $scope.QU.usuario = aData;
       });
       return nRow;
      }
    //FIN CARGA DE TABLA

    $scope.guardar = function (){
      var usuario = $scope.QU.usuario;
      var obPersona = {
        'table': 'persona',
        'vV' :{
          'form' : usuario,
          'cant' : 6
        },
        'vR' : {
          'form' : {
            'telefono' : usuario.telefono
          },
          'where' : ' and id_persona  <> ' + usuario.id_persona
        },
        u : {
          'val':{
            'nombre' : usuario.nombre,
            'telefono' : usuario.telefono,
            'correo' : usuario.correo
          },
          'where' : ' id_persona  = ' + usuario.id_persona
        }
      };
      $rootScope.newU(obPersona).then(function(d){
        var role = 0;
        if(!usuario.rol2)
          role = usuario.id_rol;
        else
          role = usuario.rol2.id_rol;


        if(d){
          var obUsuario = {
            'table': 'usuario',
            'vV' :{
              'form' : usuario,
              'cant' : 6
            },
            'vR' : {
              'form' : {
                'nickname' : usuario.nickname
              },
              'where' : ' and id_usuario  <> ' + usuario.id_usuario
            },
            u : {
              'val':{
                'nickname' : usuario.nickname,
                'contrasena' : usuario.contrasena,
                'fk_id_rol' : role
              },
              'where' : ' id_usuario  = ' + usuario.id_usuario
            }
          };
          $rootScope.newU(obUsuario).then(function(){
            reloadData();
          });
        }
      });
    };
  });
