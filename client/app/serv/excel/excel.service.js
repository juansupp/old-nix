'use strict';

angular.module('nixApp')
  .service('excel', function($q, $rootScope, global, bifrost) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    function startsWith(string, prefix) {
      return string.slice(0, prefix.length) == prefix;
    }


    function endsWith(str, suffix) {

      var letra = str.charAt(0);
      var numero = '';
      for (var i = 1; i < str.length; i++)
        numero += str[i]

      return suffix == numero;
    }

    var exportInventario = function(file, showPreview) {

    };

    var exportTipo = function(data) {
      console.log('paso');
      //array de array que guarda cada fila del excel
      var tipo = [];
      //For para recorrer la hoja de excel
      for (var i = 1; i < global.lg(data); i++) {
        //array temporal para guardar cada fila
        var arr = [];
        //For para llenar [arr] por cada fila
        for (var item in data) {
          //
          if (endsWith(item, i)) {
            arr.push(data[item].w);
          }
        }
        //En caso que haya una casilla vacía
        if (arr.length > 0)
          tipo.push(arr);
      }
      //**Construcción de el where para filtrar los datos repetidos
      var w = '';
      for (var i = 0; i < tipo.length; i++) {
        if (i == 0)
          w += "nombre_tipo_activo = '" + tipo[i][0] + "'";
        else
          w += " or nombre_tipo_activo = '" + tipo[i][0] + "'";
      }
      //**
      //Busqueda de tipos de activos repetidos
      bifrost.s({
        table: 'tipo_activo',
        val: 'id_tipo_activo',
        where: w
      }).then(function(r) {
        //En caso que no se repita ningun tipo de activo
        if (!(r.length > 0)) {
          //Array para guardar toadas las promises que habrán
          var promises = [];
          //For para cada fila que hay en [tipo]
          angular.forEach(tipo, function(value, i) {
            //Variable [prom]  que equivale a cada promesa
            var prom = $q(function(resolve) {
              //Se inserta el tipo de activo que se encuentre en laq fila
              bifrost.i({
                table: 'tipo_activo',
                val: global.rQ([tipo[i][0]])
              }).then(function() {
                //Responde cada fila
                resolve(tipo[i]);
              });
            });
            //Una vez finalizada la promesa se
            promises.push(prom);
          });
          //Recorre el array de promesas ya realizado
          $q.all(promises).then(function(respon) {
            //For para recorrer todas las filas
            //for (var mu = 0; mu < respon.length; mu++) {
            angular.forEach(respon, function(value, mu) {
              //En caso que tenga especificaciones
              if (respon[mu].length > 1) {
                //Variable [espCampo] para guardar cada una de las especificaciones por fila
                var espCampo = '';
                //For para llenar la variable EspCamp
                for (var xo = 1; xo < respon[mu].length; xo++) {
                  if (xo == 1)
                    espCampo += respon[mu][xo];
                  else
                    espCampo += '*' + respon[mu][xo];
                }
                //Busca el id del tipo de activo según en nombre
                bifrost.s({
                  table: 'tipo_activo',
                  val: 'id_tipo_activo',
                  where: "nombre_tipo_activo  = '" + respon[mu][0] + "'"
                }).then(function(dater) {
                  //Devuelve el id de cada fila
                  var id = dater[0].id_tipo_activo;
                  // Inserta EspCampo
                  bifrost.i({
                    table: 'espCampo',
                    val: global.rQ([
                      id,
                      espCampo
                    ])
                  }).then(function() {
                    //Exportación exitosa

                  });
                });
              }
            });
          });
        } else { //En caso que se repita
          console.log('repetido hasta nbo poder mas ');
        }
      });
    };

    var exportBasic = function(file, showPreview) {
      var deferred = $q.defer();
      XLSXReader(file, showPreview, function(data) {
        $rootScope.$apply(function() {
          deferred.resolve(data);
        });
      });
      return deferred.promise;
    };

    return {
      eI: exportInventario,
      eT: exportTipo,
      eB: exportBasic
    };
  });
