'use strict';

angular.module('nixApp')
  .controller('QueryCCtrl', function ($q,$scope,$rootScope,$location,$compile,  //Variables
    bifrost,DTColumnBuilder,LxNotificationService,LxProgressService,LxDialogService,global,DTDefaultOptions,DTOptionsBuilder) { // SERVICES
      $scope.QC = {};
    ////CARGA DE TABLA
      //CARGA PROMESA
      function lePromise(tt){
        return $q(function(resolve,reject){
          var option =  DTOptionsBuilder.fromFnPromise(function() {
            return $q(function(resolve,reject){
              bifrost.s({
                "table" : tt,
                "val" : " * "
              }).then(function(data){
                resolve(data);
              });
            });
          }).withPaginationType('full_numbers').withColumnFilter().withDisplayLength(30)
            .withOption('bLengthChange',false).withOption('order', [1, 'desc'])
            .withOption('createdRow', createdRow).withOption('rowCallback',rowCallback);
            //RETURN
            resolve(option);
        });
      }

      function reloadData() {
        LxDialogService.close("dial");
        $scope.dtInstance.reloadData(callback, false);
        $scope.dtInstance2.reloadData(callback, false);
      }

      function callback(json) {
          console.log(json);
      }
      $scope.dtInstance = {};
      $scope.dtInstance2 = {};
      //CARGA Y CONFIGURACION DE OPCIONES
      //1. Sedes
      $scope.dtOptionsCustomers = lePromise("T_Sedes");
      //2. Contactos
      $scope.dtOptionsContacts = lePromise("T_Contacto");
      //3. Areas
      $scope.dtOptionsArea = lePromise("T_Area");

      //ORDEN DE COLUMNAS
       $scope.dtColumnsCustomers = [
          DTColumnBuilder.newColumn('cliente').withTitle('Cliente'),
          DTColumnBuilder.newColumn('NIT').withTitle('NIT'),
          DTColumnBuilder.newColumn('direccion').withTitle('Dirección'),
          DTColumnBuilder.newColumn('telefono').withTitle('N° Telefonico')
       ];

       $scope.dtColumnsContacts = [
         DTColumnBuilder.newColumn('cliente').withTitle('Cliente'),
         DTColumnBuilder.newColumn('nombre_contacto').withTitle('Contacto'),
         DTColumnBuilder.newColumn('correo').withTitle('Correo electronico'),
         DTColumnBuilder.newColumn('usuario').withTitle('Usuario'),
         DTColumnBuilder.newColumn('contrasena').withTitle('Contraseña')
       ];

       $scope.dtColumnsArea = [
          DTColumnBuilder.newColumn('cliente').withTitle('Cliente'),
          DTColumnBuilder.newColumn('nombre_area').withTitle('Area')
       ];
     //INICIO DE TABLA
     function createdRow(row, data, dataIndex) {
        $compile(angular.element(row).contents())($scope);
      }

      function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
       $('td', nRow).unbind('dblclick');
       $('td', nRow).bind('dblclick', function() {
         if(aData.id_contacto){ // CONTACTO
           $scope.QC.edit = "Contacto";
           $scope.QC.contacto = aData;
           LxDialogService.open("dial");
         }
         else if(!aData.id_area){ // CLIENTE (SEDE EMPRESA)
           $scope.QC.edit = "Cliente";
           $scope.QC.cliente = aData;
           LxDialogService.open("dial");
         }
       });
       return nRow;
      }
    //FIN CARGA DE TABLA

    $scope.guardar = function (edit){
      if(edit == "Contacto"){
        //////////////////////////////////////////////////////////CONTACTO
        var obContacto = $scope.QC.contacto;
        if(obContacto.contrasena == obContacto.contrasena2){
          var ob  = {
            "table" : "contacto",
            "vV" : {
              "form": {
                "nombre_contacto" : obContacto.nombre_contacto,
                "correo" : obContacto.correo
              },
              "cant" : 2
            },
            "vR" : {
              "form" : {
                "usuario" : obContacto.usuario
              },
              "where" : " and id_contacto <> "+ obContacto.id_contacto
            },
            "u":{
              "val" :  {
                "nombre_contacto" : obContacto.nombre_contacto,
                "usuario" :  obContacto.usuario,
                "correo" : obContacto.correo,
                "contrasena" : obContacto.contrasena
              },
              "where" :" id_contacto = "+ obContacto.id_contacto
            }
          };
          $rootScope.newU(ob).then(function(ro){
            if(ro)
              reloadData();
          });
        }else
          global.not("Verifica que las contraseñas coincidan.");
      }
      else if (edit == "Cliente"){
        //empresa
        var obCliente = $scope.QC.cliente;
        var ob  = {
          "table" : "empresa",
          "vV" : {
            "form": {"nombre" : obCliente.nombre},
            "cant" : 1
          },
          "vR" : {
            "form" : {
              "NIT" : obCliente.NIT,
              "nombre" : obCliente.nombre
            },
            "where" : " and id_empresa <> "+ obCliente.id_empresa

          },
          "u":{
            "val" :  {
              "nombre" : obCliente.nombre,
              "NIT" : obCliente.NIT
            },
            "where" :" id_empresa = "+ obCliente.id_empresa
          }
        };
        $rootScope.newU(ob).then(function(){
          /////////////////////////////////////////////SEDE
          var obS  = {
            "table" : "sede",
            "vV" : {
              "form":{
                "nombre_sede" : obCliente.nombre_sede,
                "telefono" : obCliente.telefono
              },
              "cant" : 2
            },
            "vR" : {
              "form":{
                "nombre_sede" : obCliente.nombre_sede,
                "telefono" : obCliente.telefono
              },
              "where" : " and id_sede <> "+ obCliente.id_sede
            },
            "u":{
              "val" :  {
                "telefono" : obCliente.telefono,
                "nombre_sede" : obCliente.nombre_sede,
                "direccion" : obCliente.direccion
              },
              "where" :" id_sede = "+ obCliente.id_sede
            }
          };
          $rootScope.newU(obS).then(function(ro){
            if(ro)
              reloadData();
          });
        });
        //sede
      }
    };
  });
