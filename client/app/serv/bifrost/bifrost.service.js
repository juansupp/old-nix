'use strict';
/**
  BRIDGE CONNECTION NODE ______-----_____ ANGULAR
*/

(function(){
  angular.module('nixApp')
  .service('bifrost', function($http, $q) {
    var urlApi = '/api/connections/'
    /*
      This function allow cast the ordinaryParams (client)   to 
      magicParams (Server)
    */
    var setMagicParams = function(ordinaryParams,url) {
      console.dir(ordinaryParams)
        //Where por defecto 1 = 1
        if(ordinaryParams.where === undefined) ordinaryParams.where = ' 1=1 ';
        //
        for (var param in ordinaryParams) {
          //
          ordinaryParams[param] = ordinaryParams[param].toString()
          //Desinfect the HACKS
          ordinaryParams[param] = ordinaryParams[param].replace(/--|select|insert|update|delete|exec|create/g, '');
        }
        /* HERE ARE THE FUCKIG MAGIC PARAMS*/
        var obApi =  {
          t : ordinaryParams.table,
          v : ordinaryParams.val,
          w : ordinaryParams.where
        };

        var defer = $q.defer();
        $http.post(url,obApi).then(function(response){ defer.resolve(response.data)});
        return defer.promise;
    };


    /*select */
    var select = function(ordinaryParams) {
      return setMagicParams(ordinaryParams,urlApi+'q');
    };
    var update = function(ordinaryParams) {
     return setMagicParams(ordinaryParams,urlApi+'u');
    };
    var insert = function(ordinaryParams) {
      return setMagicParams(ordinaryParams,urlApi+'i');
    };
    var rExecute = function(ordinaryParams) {
      return setMagicParams(ordinaryParams,urlApi+'rP');
    };
    var eExecute = function(ordinaryParams) {
      return setMagicParams(ordinaryParams,urlApi+'eP');
    };

    

    /*var newSelect = function(p) {
      return $q(function(resolve, reject) {
        if (p.where == undefined)
          p.where = ' 1=1 ';
        for (var o in p) {
          if (p[o] instanceof Array)
            p[o] = p[o].toString()
          p[o] = p[o].replace(/--|select|insert|update|delete|exec|create/g, '');
        }
        params = p;
        //
        prePost('/api/connections/q', {
            'sentence': 'select ' + params.val.toString() + ' from ' + params.table + ' where ' + params.where
          })
          .then(function(ep) {
            if (ep)
              resolve(ep);
            else
              not('ERROR CONECCTION ON SUPER TRUNCE SELECT');
          }, function(op) {
            not('ERROR CONECCTION ON SELECT');
            reject(op);
          });



      });
    };*/

    return {
      s: select,
      i: insert,
      u: update,
      rE: rExecute,
      eE: eExecute
      /*sParams: setParams,
      gParams: function() {
        return params;
      }*/
    };
  });

  
})();
