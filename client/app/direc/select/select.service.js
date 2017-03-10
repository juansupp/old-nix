'use strict';

(function(){

  angular.module('nixApp')
    .service('selectService',SelectService);

    function SelectService (bifrost) {

      return {
        start : start
      };
      //Funciones publicas
      function start (option,filter) {
        switch (option) {
          case 'servicio':
            return servicio();
            break;
          case 'mesa':
            return mesa();
            break;
          case 'origen':
            return origen();
            break;
          case 'prioridad':
            return prioridad();
            break;
          case 'cliente':
            return cliente();
            break;
          case 'area':
            return area(filter);
            break;
          case 'contacto':
            return contacto(filter);
            break;
          case 'tecnico':
            return tecnico();
            break;
          case 'tipo_activo':
            return tipoActivo();
            break;
          case 'area_sede':
            return cliente();
            break;
          default :
            console.log('._.');

        }
      }

      //Funciones internas
      function servicio () {
        return globalQuery('servicio','*');
      }
      function mesa () {
        return globalQuery('mesa_servicio','*');
      }
      function origen () {
        return globalQuery('original','*');
      }
      function prioridad () {
        return globalQuery('prioridad','*');
      }
      function cliente () {
        return globalQuery('empresa_sede','*');
      }
      function tipoActivo () {
        return globalQuery('tipo_activo','*');
      }
      function area (id_sede) {
        if (!id_sede) {return null};
        var tabla  = 'area_sedes';
        var values = 'nombre_area,id_area';
        var where = 'fk_id_sede = '+id_sede;
        return globalQuery(tabla,values,where);
      }
      function contacto (id_sede) {
        if (!id_sede) {return null};
        var tabla  = 'sede_contacto';
        var values = 'nombre_contacto,id_contacto';
        var where = 'fk_id_sede = '+id_sede;
        return globalQuery(tabla,values,where);
      }
      function tecnico () {
        return globalQuery('tecnicos','*');
      }

      function globalQuery(table,val,where){
        var w =  !where ? '1=1' : where;
        var sentence  =  {
          table : table,
          val : val ,
          where : w
        };
        return bifrost.s(sentence);
      }
    }
})();
