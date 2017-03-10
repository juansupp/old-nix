'use strict';

angular.module('nixApp')
  .service('global', function($q, bifrost, LxNotificationService, $timeout, $rootScope) {

    var setStorage = function(stor) { // SE PASA OBJECT
      return $q(function(resolve, reject) {
        for (var s in stor) {
          if (window.localStorage.getItem(s))
            window.localStorage.removeItem(s);
          window.localStorage.setItem(s, stor[s]);
          resolve('ya');
        }
      });
    };
    //
    var getStorage = function(arrStor) {
      if (arrStor instanceof Array) {
        var obj = "{";
        for (var i = 0; i < arrStor.length; i++)
          obj += ' "' + arrStor[i] + '" : "' + window.localStorage.getItem(arrStor[i]) + '",';
        obj = obj.substring(0, obj.length - 1);
        obj += "}";
        obj = JSON.parse(obj);
        return obj;
      } else
        return window.localStorage.getItem(arrStor);
    };
    //
    var delStorage = function(arr) {
      if (arr instanceof Array)
        for (var i = 0; i < arr.length; i++)
          window.localStorage.removeItem(arr[i]);
      else
        window.localStorage.removeItem(arr);
    };

    var clearText = function(text) {
      return text.replace(/\"|\'|\*|\_|\-|\s|\t|\w|\b|\n|\s|\f|\d/g, '');
    };

    var reQuotes = function(q) {
      var rQ = [];
      for (var i = 0; i < q.length; i++) {
        q[i] = q[i].toString();
        rQ[i] = "'" + q[i].replace(/'/g, '') + "'";
      }
      return rQ;
    };

    var castDate = function(date) {
      (date).setDate((date).getDate());
      var fecha = (date).getFullYear() + '-' + ('0' + ((date).getMonth() + 1)).slice(-2) + '-' + ('0' + (date).getDate()).slice(-2);
      return fecha;
    };

    var rNumeroTicket = function() {
      return $q(function(resolve) {
        bifrost.sParams({
          "table": " ticket ",
          "val": " top(1) N_Ticket ",
          "where": " 1 = 1 order by N_Ticket desc "
        }).then(function(dat) {
          bifrost.s().then(function(Numero) {
            resolve(Numero[0].N_Ticket);
          });
        });
      });
    };

    var not = function(f) {
      $rootScope.hideProg();
      LxNotificationService.warning(f);
    }

    var notS = function(f) {
      $rootScope.hideProg();
      LxNotificationService.success(f);
    }

    var valueRepeat = function(valueObj, table, w) {
      return $q(function(resolve) {
        var promises = [];
        angular.forEach(valueObj, function(value, key) {
          var obj = {};
          if (w)
            obj = {
              "table": table,
              "val": "*",
              "where": key + " = '" + value + "'  " + w
            };
          else
            obj = {
              "table": table,
              "val": "*",
              "where": key + " = '" + value + "'"
            };

            var prom = $q(function(resolve){
              bifrost.ns(obj).then(function(data) {
                if (data.length > 0)
                  resolve('El/La ' + key + ' ya se encuentra registrad@');
                else
                  resolve(0);
              });
            });
            promises.push(prom);
        });

        $q.all(promises).then(function(respon){
          var m = 0;
          for (var i = 0; i < respon.length; i++) {
            if(respon[i] !== 0){
              resolve(respon[i]);
              break;
            }
            else
              m++;
          }
          if(m >= respon.length)
            resolve(0);
        });

      });
    };

    var leng = function(obj) {
      return Object.keys(obj).length;
    };

    var valoresVacios = function(obj, num) {
      var x = true;
      if (obj != undefined) {
        if (Object.keys(obj).length >= num) {
          for (var m in obj) {
            if (obj[m] == undefined || obj[m] == "") {
              x = false;
            }
          }
        } else {
          x = false;
        }
      } else x = false;
      return x;
    };

    var returnEquals = function(ob) {
      var val = "";
      for (var i in ob)
        val += i + " = '" + ob[i] + "',";
      val = val.slice(0, -1);
      return val;
    };

    return {
      sStor: setStorage,
      gStor: getStorage,
      dStor: delStorage,
      clear: clearText,
      rQ: reQuotes,
      cD: castDate,
      rNT: rNumeroTicket,
      not: not,
      notS: notS,
      vR: valueRepeat,
      lg: leng,
      vV: valoresVacios,
      rE: returnEquals
    };
  });
