'use strict';

angular.module('nixApp')
  .service('charts', function(bifrost, global, $q) {
    //Object chart estado
    var obChartE = function(chart) {
      var label = [];
      var data = [];
      var series = ['Nuevo', 'En proceso', 'Pendiente cierre', 'Cerrado'];

      var ter = {
        N: [],
        P: [],
        V: [],
        C: []
      };
      return $q(function(resolve) {
        bifrost.s({
          'table': chart.table,
          'val': '*'
        }).then(function(response) {
          var ids = [];
          for (var key in response) {
            ids.push(response[key][chart.id]);
            var nom = ((response[key][chart.label]).split(' '));
            label.push(nom[0] + ' ' + nom[1]);
          }
          var promises = [];

          angular.forEach(ids, function(v, i) {
            var pro = $q(function(resolve) {
              bifrost.rE({
                'Procedure': 'eTicketos',
                'val': global.rQ([
                  'fk_' + chart.id,
                  ids[i],
                  '1=1'
                ])
              }).then(function(response2) {
                resolve(response2);
              });
            });

            promises.push(pro);
          });

          $q.all(promises).then(function(resp) {
            for (var i = 0; i < resp.length; i++) {
              for (var k in resp[i][0]) {
                ter[k].push(resp[i][0][k]);
              }
            }

            data = $.map(ter, function(value) {
              return [value];
            });
            var ob = {
              'data': data,
              'labels': label,
              'series': series
            };
            resolve(ob);
          });

        });
      });
    };
    //Object chart Date
    var obChartDate = function(ac, ser, max) { // ArrayChart

      var ob = {
        labels: [],
        series: ser,
        data: []
      };

      var mes = false;
      if (ac[0].params.length > max)
        mes = true;

      var promises = [];
      //LOOP
      angular.forEach(ac, function(v, i) { //Value / Index
        var val = global.rQ(ac[i].params);

        //
        var prom = $q(function(resolve, reject) {
          bifrost.rE({
            'Procedure': ac[i].Proc,
            'val': val
          }).then(function(response) {
            resolve(response);
          });
        });

        promises.push(prom);
      });
      //END LOOP
      var paso = false;
      $q.all(promises).then(function(rep) {
        var meses = {
          'January': '0',
          'February': '0',
          'March': '0',
          'April': '0',
          'May': '0',
          'June': '0',
          'July': '0',
          'August': '0',
          'September': '0',
          'October': '0',
          'November': '0',
          'December': '0'
        };
        var dias = {
          "1": "0",
          "2": "0",
          "3": "0",
          "4": "0",
          "5": "0",
          "6": "0",
          "7": "0",
          "8": "0",
          "9": "0",
          "10": "0",
          "11": "0",
          "12": "0",
          "13": "0",
          "14": "0",
          "15": "0",
          "16": "0",
          "17": "0",
          "18": "0",
          "19": "0",
          "20": "0",
          "21": "0",
          "22": "0",
          "23": "0",
          "24": "0",
          "25": "0",
          "26": "0",
          "27": "0",
          "28": "0",
          "29": "0",
          "30": "0",
          "31": "0"
        };
        //LLENAR DATA
        var data = [];
        for (var m = 0; m < rep.length; m++) {
          var temp = {};

          if (mes)
            temp = dias;
          else
            temp = meses;

          for (var x = 0; x < rep[m].length; x++) {
            if (mes)
              temp[rep[m][x]['dia']] = (rep[m][x]["cantidad"]).toString();
            else
              temp[rep[m][x]['mes']] = (rep[m][x]["cantidad"]).toString();
          }
          var arrTemp = [];
          for (var item in temp) {
            arrTemp.push((temp[item]).toString());
            if (!paso) {
              ob.labels.push(item);
            }
          }
          paso = true;
          ob.data.push(arrTemp);
        }

      });

      return $q(function(resolve) {
        resolve(ob);
      });
      //
    }
    return {
      oCE: obChartE,
      oCD: obChartDate
    };
  });
