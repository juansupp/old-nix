'use strict';

(function() {

  angular.module('nixApp')
    .service('tablerService', tablerService);

  function tablerService(bifrost,DTColumnBuilder,DTOptionsBuilder,$compile,$q) {

    return {
      cargarColumnas: cargarColumnas,
      cargarOptions: cargarOptions,
      rePromise : promise
    };

    function promise(table,where) {
      var w = where ? w : '1=1'
      var ob = {
        table: table,
        val: '*',
        where: w
      }
      return bifrost.s(ob);
    }

    function ca () {
      return [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('name').withTitle('name'),
      ];

    }
    var scope = {};
    function cargarOptions(table,_scope) {
      scope = _scope;
      return DTOptionsBuilder.fromFnPromise(promise(table))
        .withOption('bLengthChange', false)
        .withOption('bInfo', false)
        .withColumnFilter()
        .withOption('responsive', true)
        //.withOption('createdRow', createdRow)
        .withOption('order', [1, 'desc'])
        .withOption('rowCallback', rowCallback);
    }
    
    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        console
        $('td', nRow).unbind('click');
        $('td', nRow).bind('click', function() {
          scope.rowClick(aData);
        });
        return nRow;
    }

    //FALTA EL PROTOCOLO
    /*
    protocolo

    obColumns =  [
    {
      c: 'columna en base de datos ',
      t:'Nombre del titulo',
      r : funcion de render(),
      o : ARRAY DE OBJETIOS  = [
        {op:'opcion',val:valor},
        {op:'opcion',val:valor}
      ]

    }, ----> Primer columna

  ]

    */
    function cargarColumnas(ob) {
      //Array de cada columna
      var arr = [];
      //For para recorrer las columnas declaradas en ob {c = Nombre de la columnas, t = Titulo}
      for (var i = 0; i < ob.length; i++) {
        //Var renderizar la columna con columna y titulo
        var col = DTColumnBuilder.newColumn(ob[i].c).withTitle(ob[i].t);
        //En caso que sea una columna con renderización personalizada
        if (ob[i].r) {
          col.renderWith(ob[i].r);
        }
        //En caso que sea una columna con opciones especiales
        if (ob[i].o) {
          //For para recorrer cada opcion que haya en el Array
          for (var x = 0; x < ob[i].o.length; x++) {
            //Var option para para Object {op = Nombre de la opcion, val = valor de la opcion}  que esté en el array
            var option = ob[i].o[x];
            //Se agregan las opciones a la variable col
            col.withOption(option.op, option.val);
          }
        }
        //En caso que no se permita hacer el sort
        if (!ob.sort){
          col.notSortable();
        }
        //Se agrega cada una de las columnas
        arr.push(col);
      }
      //Se retorna el array una vez lleno
      return arr;
    }
  }
})();
