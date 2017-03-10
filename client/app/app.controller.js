'use strict';

angular.module('nixApp')
  .controller('AppCtrl', function (
      $scope,$rootScope, $state,$location,$timeout,
      $mdSidenav,$q, $mdUtil, $log,bifrost,DTDefaultOptions,DTOptionsBuilder,
      LxNotificationService,global) {
    //PARTTENS GLOBALES
    //Only numbers
    $rootScope.oN = /^\d+$/;
    //SCOPES GLOBALES
    $rootScope.tit = '0';
    $rootScope.firstName  = function (){
      var str = [];
      if (global.gStor('nombre')) {
        str = global.gStor('nombre').split(' ');
        return str[0];
      }else
        return 'Nada'
    }
    $rootScope.per =  $rootScope.firstName();
    //FUNCION CARGA DE CMBOS
    /*$rootScope.cargaCombo = function(table,value,where){
      return $q(function(resolve,reject){
        if (where)
          bifrost.sParams({'table' : table ,'val': value, 'where' : where});
        else
          bifrost.sParams({'table' : table ,'val': value});
        bifrost.s().then(function(r){
          resolve(r);
        });
      });
    };*/
    //MODE PARA SABER SI EL LOGIN O NO

    //INICIO DE CADA CONTROLADOR
    $scope.$watch('tit', function() {
      if ($location.$$path == '/') {// = LOGIN
        if (global.gStor('index'))// SI ESTA LOGEADO
          $state.go(global.gStor('index'));
        else
          $state.go('login');
      }
      else { // = DEMAS
        if (!(global.gStor('index')))
          $state.go('login');
      }
   });
   //NEW INSERT
   $rootScope.newI = function(ob){
      if (!ob.vals)
        ob.vals = ' ';
      if (!ob.where)
        ob.where ='';
      if (!ob.table)
        ob.table = ob.title;

      return $q(function(resolve){
        $rootScope.showProg();
        var form = {};
        if(ob.form instanceof Array ){
          for (var io = 0; io < ob.form.length;io++){
            for (var key in ob.form[io]) {
              var obje = ob.form[io];
              form[key] = obje[key];
            }
          }
        }else if (ob.form instanceof Object )
          form = ob.form;


        if (global.vV(form,ob.cant)) {
          global.vR(ob.vR,ob.table,ob.where).then(function(data){
            if (data == 0) {
              bifrost.i({
                'table' : ob.table  + ob.vals,
                'val' : global.rQ(ob.i)
              }).then(function(response){
                if (response){
                  global.notS('El/La ' + ob.title + ' se ha registrado satisfactoriamente' );
                  //
                  if(ob.order){
                    bifrost.s({
                      'table' : ob.table,
                      'val' :  'top(1) * ',
                      'where' : ' 1 = 1 order by '+ ob.order +' desc'
                    }).then(function(dater){
                      resolve(dater[0]);
                    });
                  }
                  else resolve(true);
                }
                else{
                  global.not('Verifica tu conexión');
                  resolve(response);
                }
              });
            }
            else{
              global.not((data.replace('fk_id_',' ')).replace('id_',''));
              resolve(false);
            }
          });
        }else
          global.not('Debes Completar el formularioa');
      });
    };
    //OPCIONES GLOBALES PARA TABLA
    DTDefaultOptions.setLanguage({sUrl: '//cdn.datatables.net/plug-ins/1.10.8/i18n/Spanish.json'});
    //
    $rootScope.options = DTOptionsBuilder.newOptions().withOption('bLengthChange',false).withDisplayLength(50);/*.withColumnFilter();*/
    //
    //NEW UPDATE
   $rootScope.newU = function(ob){
     if (!ob.vR.where)
       ob.where ='';

     var vals = global.rE(ob.u.val);

     return $q(function(resolve){
       if (global.vV(ob.vV.form,ob.vV.cant)) {

         global.vR(ob.vR.form,ob.table,ob.vR.where).then(function(data){
           if (data == 0) {
            bifrost.u({
              'table' : ob.table,
              'val' : vals,
              'where' : ob.u.where
            }).then(function(response){
              if (response){
                global.notS('El/La ' + ob.table +
                            ' se ha actualizado satisfactoriamente' );
                resolve(true);
              }
              else{
                global.not('Verifica tu conexión');
                resolve(response);
              }
            });
           }
           else{
             global.not((data.replace('fk_id_',' ')).replace('id_',''));
             resolve(false);
           }

         });
       }else {
         global.not('Debes completar el formulario');
       }
     });
   };

    //SHOW PROGESS
    $rootScope.showProg = function(){
      console.log('shir');
        //LxProgressService.circular.show('#00BCD4', '#prog');
    };
    //HIDE PROG
    $rootScope.hideProg = function(){
        console.log('shir');
    };
  });
