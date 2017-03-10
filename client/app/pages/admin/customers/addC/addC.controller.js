'use strict';

angular.module('nixApp')
  .controller('AddCCtrl', function ($scope,$rootScope,bifrost,global) {
    //MODELO DE controller
    $scope.AC = {};
    //funcion actualizacion de combos
    $scope.sel = {};
    $rootScope.cargaCombo("empresa","*").then(function(r){$scope.sel.cliente = r});
    //PASO SEGUN EL FLUJO
    $scope.paso = {};
    //
    function openSede(val) {
      $scope.paso.sede =true;
      $rootScope.cargaCombo("sede","*","fk_id_empresa = " + val).then(function(r){$scope.sel.sede = r;});
    }
    //
    function openContacts(){
      $rootScope.cargaCombo("area","*").then(function(r){$scope.sel.area = r;});
      $scope.paso.contact =true;
    }
    ////////////////////////////////////////////////////////////////////////////SELECTED EVENTS
    //
    $scope.clienteS = function(val){
      openSede(val.newValue.id_empresa);
    };
    //
    $scope.sedeS = function(val){
      openContacts();
    };
    //
    $scope.areaS = function(val){
      $scope.AC.area = val.newValue;
    };
    //funcion nuevo cliente
    $scope.newCustomer = function(){
      var nombre = $scope.AC.cliente.nombre, nit = $scope.AC.cliente.NIT;
      var ob = {
        "form" : $scope.AC.cliente,
        "cant" : 2,
        "vR" : {
          "nombre": nombre,
          "NIT": nit
        },
        "title" : "empresa",
        "i" : [nit,nombre],
        "where" : " and 1 = 1"
      };
      //
      $rootScope.newI(ob).then(function(ret){
        if (ret){
          bifrost.s({
            "table" : "empresa",
            "val" : " * ",
            "where" :"nit = '" + nit + "'"
          }).then(function(dat){
            $scope.AC.cliente = dat[0];
            openSede(dat[0].id_empresa);
          });
        }
      });
    };
    //funcion nueva sede
    $scope.newSede = function(){
      var nom = $scope.AC.sede.nombre_sede, dir =$scope.AC.sede.direccion , tel = $scope.AC.sede.telefono;
      var id_empresa = $scope.AC.cliente.id_empresa;
      var ob = {
        "form" : $scope.AC.sede,
        "cant" : 3,
        "vR" : {
          "direccion": dir,
          "telefono": tel
        },
        "title" : "sede",
        "i" : [nom,dir,tel,id_empresa],
        "where" : " and 1=1 "
      };
      //
      $rootScope.newI(ob).then(function(ret){
        if (ret){
          bifrost.s({
            "table" : "sede",
            "val" : " * ",
            "where" :"telefono = '" + tel + "'"
          }).then(function(dat){
            $scope.AC.sede = dat[0];
            openContacts();
          });
        }
      });
    };
    //funcion nuevo contacto
    $scope.newContact = function(){
      var nombre  = $scope.AC.contacto.nombre  , correo = $scope.AC.contacto.correo ;
      var ob = {
        "form" : $scope.AC.contacto,
        "cant" : 2,
        "vR" : {
          "nombre_contacto" : nombre,
          "correo" : correo
        },
        "where" : " and fk_id_sede = " + $scope.AC.sede.id_sede,
        "title" : "contacto",
        "vals" : "(nombre_contacto,correo,fk_id_sede)",
        "i": [nombre,correo,$scope.AC.sede.id_sede]
      }
      $rootScope.newI(ob).then(function(res){
        $scope.AC.contacto.nombre
      });
    };
    //funcion nueva area
    $scope.newArea = function(){
      var id_sede  = $scope.AC.sede.id_sede  , id_area = $scope.AC.area.id_area ;
      console.log($scope.AC.area);
      var ob = {
        "form" : $scope.AC.area,
        "cant" : 2,
        "vR" : {
          "fk_id_area" : id_area
        },
        "where" : " and fk_id_sede = " + $scope.AC.sede.id_sede,
        "title" : "area",
        "table" : "area_sede",
        "i": [id_area,id_sede]
      }
      $rootScope.newI(ob).then(function(res){
        if (res) {

        }
      });
    };
    //OBSERVADORES
    //variable cliente nuevo existente
    $scope.nuevo = {"cliente":undefined,"sede":false};
    //Check  cliente existente = true nueo cliente = false
    $scope.$watch('AC.ch.cliente',function(val){
      if (val != undefined)
        $scope.nuevo.cliente = val;
    });
    //Check  sede existente = true nueo sede = false
    $scope.$watch('AC.ch.sede',function(val){
      if (val != undefined)
        $scope.nuevo.sede = val;
    });
  });
