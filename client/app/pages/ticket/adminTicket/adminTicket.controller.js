'use strict';
//ROLES = 1 Master 6 Chief  5 Tecnico 7 Cliente 8 = VENNTAS
//ETADOS  N = NUEVO  P = PROCESO  V = PENDIENTE CIERRE C = CERRADO
angular.module('nixApp')
  .controller('AdminTicketCtrl', function ($q,$scope,$rootScope,$location,$compile,  //Variables
    bifrost,DTColumnBuilder,LxNotificationService,LxProgressService,LxDialogService,global,DTDefaultOptions,DTOptionsBuilder, // Services
    ESTADOS) {//CONSTANTES
      $rootScope.tit="Gestión de tickets";
    //--------------------------------------------------------------------------CONFIG INIT
    //----VARIABLES
    //JSON ARRAY TODOS LOS TICKETS
    $scope.dataTickets = {};
    //Tecnicos para escalar
    $scope.sel = {};
    //acciones disponibles por cada fila
    $scope.acciones = {};
    //CARGA DE CONFIG INIT
    bifrost.sParams({"table":"estado_accion","val":"distinct *"}).then(function(){ // CARGA ACCIONES
      bifrost.s().then(function(data){
        $scope.acciones = data;
        $scope.TD.cambio={"estados":ESTADOS};
      });
    });
    //--------------------------------------------------------------------------Opciones de tabla personalizada
    //RETORNO DE TICKETS ACTUALIZADOS
    function totalTicketsPromesa(where){
      return $q(function(resolve,reject){
        bifrost.sParams({
          "table" :"HistorialTicks",
          "val" : " * ",
          "where": where
        }).then(function(dep){
          bifrost.s().then(function(de){
            $scope.dataTickets = de;
            $rootScope.hideProg();
            resolve(de);
          });
        });
      });
    }
    var leWhere = "";
    //OPTIONS TABLE
    $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
      if(global.gStor('fk_id_rol') == '7')
        leWhere = ' and fk_id_sede = ' + global.gStor('fk_id_sede');
      else if(global.gStor('fk_id_rol') == '5')
        leWhere = ' and fk_id_persona = ' + global.gStor('fk_id_persona');
      return totalTicketsPromesa('1=1'+leWhere);
    }).withPaginationType('full_numbers').withColumnFilter().withDisplayLength(100)
      .withOption('bLengthChange',false).withOption('order', [1, 'desc'])
      .withOption('createdRow', createdRow);
    //COLUMNAS RENDERIZADAS
   $scope.dtColumns = [
      DTColumnBuilder.newColumn(null).withTitle('').notSortable().withOption('sWidth', '1.5%').renderWith(estado),
      DTColumnBuilder.newColumn('N_Ticket').withTitle('Nº ticket').withOption('sWidth', '6%'),
      DTColumnBuilder.newColumn(null).withTitle('').renderWith(acciones).withOption('sWidth', '15%'),
      DTColumnBuilder.newColumn('cliente').withTitle('Cliente/Sede/Area').withOption('visible',columVisible('c')),
      DTColumnBuilder.newColumn('servicio').withTitle('Servicio'),
      DTColumnBuilder.newColumn('nombre_contacto').withTitle('Usuario'),
      DTColumnBuilder.newColumn('persona').withTitle('Tecnico').withOption('visible',columVisible('t')),
      DTColumnBuilder.newColumn('fecha_creacion').withTitle('Creación')
   ];
   //INICIO DE TABLA
   $scope.instanceT = {};

 //-----------------------------------------------------------------------------FILTROS AVANZADOS


//------------------------------------------------------------------------------DIALOGOS ACCIONES
//Funciones deribadas de acciones (VER DOCUMENTARCION ESCALAR ...)
   //TD = TIPO DOCUMENTACION
   $scope.TD = {};
   //OPEN DIALOG
   $scope.openD = function(titulo,accion){
     $scope.TD.title = titulo;
     if (!accion) {
       showAccion('filter');
       $scope.TD.accion = 'filter';
       $scope.TD.show = { "filter" : true };
       LxDialogService.open('panel');
     }
     else{
       console.log(accion);
       $scope.TD.accion = accion;
       var Arr = accion.split(',');
       var id = Arr[2];
       for (var i=0; i < $scope.dataTickets.length; i++) {
         if($scope.dataTickets[i].id_ticket == id){
           bifrost.sParams({
             "table":"TextoInicialTicket",
             "val":"*",
             "where" : "id_ticket = "+ id
           }).then(function(){
             bifrost.s().then(function(reso){
               $scope.TD.doc = reso[0].texto;
               showAccion(Arr[0],id);
               LxDialogService.open('panel');
             });
           });
         }
       }
     }
   };
   //Muestra el contenido de acuerdo la acción
   function showAccion(acc,id) {
     $scope.TD.show = undefined;
     if(acc == "CambioEstado"){//------------------------------------CAMBIO ESTADO
       $scope.TD.show = {"cambio" : true}
     }
     else if(acc == "Cerrar"){ //----------------------------------------CERRAR
      var preguntasR = {};

       bifrost.sParams({"table":"pregunta","val":"*",}).then(function(){
         bifrost.s().then(function(data){
         preguntasR = data;
          bifrost.sParams({
            "table":"respuestasPosibles",
            "val":"*"
          }).then(function(){
            bifrost.s().then(function(resp){
              var respuestasR = resp;
              for (var i = 0; i < preguntasR.length; i++) {
                var arrResp = [];
                for (var x = 0; x < respuestasR.length; x++)
                  if (preguntasR[i].id_pregunta == respuestasR[x].fk_id_pregunta)
                    arrResp.push(respuestasR[x]);
                preguntasR[i].respuestas = arrResp;
                if ((preguntasR.length -1) == i) {
                  $scope.TD.cerrar = {
                    "encuesta" : preguntasR,
                    "texto" : undefined
                  };
                  for (var i = 0; i < 3; i++)
                    $scope.TD.cerrar.encuesta[i].Respuesta= undefined;
                }
              }
            });
          });
         });
       });

       $scope.TD.show = {"cerrar" : true}
     }
     else if(acc == "Escalar"){ //--------------------------------ESCALAR
      $rootScope.cargaCombo("tecnicos","*").then(function(r){$scope.sel.tecnicos =  r;});
      $scope.TD.show = {"escalar" : true}
      $scope.TD.escalar= {
        "tecnico" : undefined,
        "texto" : undefined
      };
     }
     else if(acc == "Ver"){ //------------------------- VISUALIZAR DOCUMENTACION
       $scope.TD.show = {"ver" : true}
       bifrost.sParams({
         "table":"superDT",
         "val" : "*",
         "where": " fk_id_ticket = " + id
       }).then(function(){
         bifrost.s().then(function(docum){
           for (var i = 0; i < docum.length; i++) {
             if(docum[i].tipo == 'II')
               docum[i].title = "Inicio";
             else if(docum[i].tipo == 'OO')
               docum[i].title = "Observación";
             else if(docum[i].tipo == 'SS')
               docum[i].title = "Solución";
             else if(docum[i].tipo == 'EE')
               docum[i].title = "Escalamiento";
             else if(docum[i].tipo == 'CE')
               docum[i].title = "Cambio estado";
             else if(docum[i].tipo == 'CC')
               docum[i].title = "Cierre";
           }
           $scope.TD.ver = docum;
         });
       });
     }
     else if(acc == "Documentar"){//---------------------DOCUMENTAR O  SOLUCIONAR
       $scope.TD.show = {"documentar" : true}
       $scope.TD.documentar ={
         "r" : "O",
         "texto":undefined
       };
     }
     else if(acc == "filter"){

     }
   }
   //CLICK EN ACEPTAR
    $scope.Accion = function(aData){//ACCION DATA  --COMPLETA
      $rootScope.showProg();
      var arrDat = aData.split(','); //0= ACCION, 1= NUMERO 2 = ID
      //SWITCH
      if(arrDat[0] == "CambioEstado"){/////////////////////////////////////CAMBIO ESTADO
        var cambio = $scope.TD.cambio;
        if (cambio.estado && cambio.texto) {
          bifrost.sParams({
            "Procedure":"cambioEstado",
            "val":global.rQ([
              arrDat[2],
              cambio.estado,
              cambio.texto,
              global.gStor('nombre')
            ])
          }).then(function(){
            bifrost.eE().then(function(bol){
              if (bol){
                global.notS('Cambio exitoso');
                reloadTable();
              }
            });
          });
        }else
          global.not('Debes completar el formulario!');
      }
      else if(arrDat[0] == "Cerrar"){ //////////////////////////////////////CERRAR
        var arrEnc = $scope.TD.cerrar.encuesta;
        var valido = true;
        for (var i = 0; i < arrEnc.length; i++) {
          if (!arrEnc[i].Respuesta) {
            valido = false;
            break;
          }
        }
        if(!valido || !$scope.TD.cerrar.texto)
          global.not('Verifica que todo esté en orden');
        else{
          bifrost.sParams({
            "Procedure":"cerrarTicket",
            "val" : global.rQ([
              arrDat[2],
              $scope.TD.cerrar.texto,
              global.gStor('nombre')
            ])
          }).then(function(){
            bifrost.eE().then(function(bol){
              if(bol){
                reloadTable();
                global.notS('Cierre exitoso');
              }
              else
                global.not('Comprueba tu conexión a internet')
            });
          });
        }
      }
      else if(arrDat[0] == "Escalar"){
        var esca =  $scope.TD.escalar;
        if (!esca.texto || !esca.tecnico.id_persona) {
          global.not('Verifica el formulario');
        }else {
          bifrost.sParams({
            "Procedure":"escalarTicket",
            "val" : global.rQ([
              arrDat[2],
              esca.tecnico.id_persona,
              esca.texto,
              global.gStor("nombre")
            ])
          }).then(function(){
            bifrost.eE().then(function(data){
              if (data){
                global.notS('Escalado satisfactoriamente');
                reloadTable();
              }
            });
          });
        }
      }
      else if(arrDat[0] == "Documentar"){
        if (!$scope.TD.documentar.texto || !$scope.TD.documentar.r) {
          global.not('Verifica si el formulario está completo');
        } else {
          var val = [
            arrDat[2],
            $scope.TD.documentar.texto,
            global.gStor("nombre")
          ];
          var procedure = "documentarTicketObservacion";
          if($scope.TD.documentar.r !== 'O'){
            procedure = "documentarTicket"; // SOLUCION
            val.splice(2,0,$scope.TD.documentar.r);
          }
          bifrost.sParams({
            "Procedure" : procedure,
            "val" : global.rQ(val)
          }).then(function(){
            bifrost.eE().then(function(data){
              if (data) {
                global.notS('Documentado satisfactoriamente');
                reloadTable();
              }
            });
          });
        }
      }
      else if (arrDat[0] == 'filter'){
        var where  = "";
        var filter = $scope.TD.filter;
        if(filter.estado){
          where += " estado = '"+ filter.estado +"'  and";
          global.sStor({"filterEstado": filter.estado });
        }
        if (filter.desde && filter.hasta){
          where += " (fecha >= '"+ global.cD(filter.desde) +"' and fecha <= '"+ global.cD(filter.hasta) +"' )  and";
          global.sStor({"filterRange1": filter.desde,"filterRange2": filter.hasta  });
        }
        where += " 1 = 1"+leWhere;
        $scope.instanceT.changeData(function(){
          LxDialogService.close("panel");
          return totalTicketsPromesa(where);
        });
      }
    }
    //RESET TABLE
    function reloadTable(){
      LxDialogService.close("panel");
      var resetPaging = false;
      $scope.instanceT.reloadData(callback, resetPaging);
    }
    function callback(json) {
        $rootScope.hideProg();
    }
    //FILTER FUNCTIONS
    $scope.refreshTable = function(){
      $scope.TD.filter= undefined;
      $rootScope.showProg();
      $scope.instanceT.changeData(function(){
        return totalTicketsPromesa(' 1 = 1 '+leWhere);
      });
    }

///-----------------------------------------------------------------------------FUNCIONES DE RENDERIZACION
   //retorno estado segun linea
  function estado(data, type, full, meta) {
   return ' <div class="estadoColor '+ data.estado +' "></div>';
  }
  //retorno acciones segun estado y rol
  function acciones(data, type, full, meta){
    var acciones = $scope.acciones;
    var render = "";
    var eRow = data.estado;

    for (var i = 0; i < acciones.length; i++)
      if (eRow == acciones[i].estado){
        if(acciones[i].accion == "CambioEstado" || acciones[i].accion == "Cerrar"  ){
          if (global.gStor("fk_id_rol") == '1' || global.gStor("fk_id_rol") == '6' )
            render += "<button ng-click='openD(\""+ acciones[i].tool +", ticket Nº "+ data.N_Ticket +" \",\""+ acciones[i].accion +","+ data.N_Ticket +","+ data.id_ticket +"\" )'"+
            " class='btn btn--m btn--blue btn--icon' lx-ripple lx-tooltip='"+ acciones[i].tool +"' ><i class='mdi mdi-"+ acciones[i].icono +"'  ></i></button>" ;
        }
        else{
          if(acciones[i].accion == "Documentar" || acciones[i].accion === "Escalar"){
            if (global.gStor("fk_id_rol") != '7')
              render += "<button ng-click='openD(\""+ acciones[i].tool +", ticket Nº "+ data.N_Ticket +" \",\""+ acciones[i].accion +","+ data.N_Ticket +","+ data.id_ticket +"\" )'"+
              " class='btn btn--m btn--blue btn--icon' lx-ripple lx-tooltip='"+ acciones[i].tool +"' ><i class='mdi mdi-"+ acciones[i].icono +"'  ></i></button>" ;
          }else {
            render += "<button ng-click='openD(\""+ acciones[i].tool +", ticket Nº "+ data.N_Ticket +" \",\""+ acciones[i].accion +","+ data.N_Ticket +","+ data.id_ticket +"\" )'"+
            " class='btn btn--m btn--blue btn--icon' lx-ripple lx-tooltip='"+ acciones[i].tool +"' ><i class='mdi mdi-"+ acciones[i].icono +"'  ></i></button>" ;
          }
        }
      }
    return render;
  }
  //Rendeeriza visibilidad de COLUMNAS
  function columVisible(arg){
    if (arg == 'c')
      if(global.gStor("fk_id_rol") == '7' ) // CLIENTE
        return false;
      else
        return true;
    else  //t = 5 = Tecnico
      if(global.gStor("fk_id_rol") == '5' ) // CLIENTE
        return false;
      else return true;
  };
  //renderiza directivas
  function createdRow(row, data, dataIndex) {
     $compile(angular.element(row).contents())($scope);
   }
  });
