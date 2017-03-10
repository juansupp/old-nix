'use strict';

angular.module('nixApp')
  .controller('AddUCtrl', function (
      $scope,$rootScope,bifrost,global,$mdToast,$animate) {
    $scope.AU = {};
    $scope.AU.user = {};
    $scope.AU.persona = {};
    $scope.sRol = {};
    bifrost.s({
      'table' : 'rol',
      'val' : '*',
      'where' : 'id_rol <> 7'
    }).then(function(d){
      $scope.sRol = d;
    });


    $scope.add = function(){


      if($scope.AU.user.pass == $scope.AU.user.pass2 ){

        var persona =  $scope.AU.persona;
        var usuario =  $scope.AU.user;
        var obPersona = {
          //vV
          "form" : [persona,usuario],
          "cant" : 7,
          //vR
          "vR" : {
            "telefono" : persona.telefono
          },
          "title" : "Persona",
          //insert
          "i" : [persona.nombre, persona.telefono, persona.correo],
          "order": "id_persona"
        };

        $rootScope.newI(obPersona).then(function(d){
          if(d){
            var obUsuario = {
              //vV
              "form" : usuario,
              "cant" : 3,
              //vR
              "vR" : {
                "nickname" : usuario.nick
              },
              "title" : "Usuario",
              //insert
              "i" : [usuario.nick, usuario.pass, usuario.rol.id_rol, d.id_persona]
            };

            $rootScope.newI(obUsuario);
          }else{
            console.log('what');
          }
        });
      }else
        global.not('Verifica que las contrasñas sean iguales');
    };
  });
