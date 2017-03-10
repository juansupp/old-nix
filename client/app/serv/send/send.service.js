'use strict';

angular.module('nixApp')
  .service('send', function($http, $q) {


    var sen = {
      to: '',
      body: '',
      subject: ''
    };

    var sender = function() {
      return $q(function(resolve, reject) {
        $http.post('/api/mails/send', sen).then(function(response) {
          resolve(response);
        }, function(response) {
          not('ERROR CONECCTION POST RETURN');
          reject(response.status);
        });
      });
    };


    var newT = function(ob) {
      //return $q(function(resolve) {
        sen.to = ob.toT;
        sen.subject = 'Nuevo ticket N°' + ob.body.n;
        sen.body = '<ul>' +
          '<li>Fecha de atención : ' + ob.body.fecha + '</li>' +
          '<li>Cliente/sede/area : ' + ob.body.cliente.nombre + '</li>' +
          '<ul>' +
          '<li>Dirección: ' + ob.body.cliente.direccion + '</li>' +
          '<li>Telefono: ' + ob.body.cliente.telefono + '</li>' +
          '<li>Usuario: ' + ob.body.cliente.usuario + '</li>' +
          '</ul>';
        sen.body += '<li>Tipo de servicio: ' + ob.body.tipo_servicio + '</li>' + '<li>Activo: ' + ob.body.activo.tipo_activo + '</li>';
        sen.body += '<li>Descripción: ' + ob.body.descripcion + '</li>';
        sen.body += '</ul>'  ;
        if (ob.body.activo.tipo_activo !== 'No') {
          sen.boby +=
            '<ul>' +
            '<li>Placa inventario: ' + ob.body.activo.placa_inv + '</li>' +
            '<li>Serial:' + ob.body.activo.serial + '</li>' +
            '<li>Placa seguridad :' + ob.body.activo.placa_seg + '</li>' +
            '<li>Marca :' + ob.body.activo.marca + '</li>' +
            '<li>Modelo :' + ob.body.activo.modelo + '</li>' +
            '</ul>';

        }


        sender().then(function(response) {
          sen.to = ob.toC;
          sen.subject = 'Nuevo servicio N°' + ob.body.n;
          sen.body = "Buen día Señor(a) " + ob.body.cliente.usuario + ". <br/> Su solicitud de servicio ha sido registrada satisfactoriamente. <br>";
          sen.body += "Nos permitimos informar que el personal de Supplies de Colombia S.A.S se retirará de sus instalaciones una vez culminado el proceso.<br/>";
          sen.body += "Agradecemos su comprensión y colaboración. <br/>";
          sen.body +=
            '<ul>' +
            '<li>Fecha de atención: ' + ob.body.fecha + '</li>' +
            '<li>Tecnico encargado: ' + ob.body.tecnico.nombre + '</li>';
          sen.body += '<li>Tipo de servicio: ' + ob.body.tipo_servicio + '</li>';
          sen.body += '<li>Activo: ' + ob.body.activo.tipo_activo + '</li>';
          if (ob.body.activo.tipo_activo !== 'No') {
            sen.boby +=
              '<ul>' +
              '<li>Placa inventario: ' + ob.body.activo.placa_inv + '</li>' +
              '<li>Serial:' + ob.body.activo.serial + '</li>' +
              '<li>Placa seguridad :' + ob.body.activo.placa_seg + '</li>' +
              '<li>Marca :' + ob.body.activo.marca + '</li>' +
              '<li>Modelo :' + ob.body.activo.modelo + '</li>' +
              '</ul>';

          }

          sen.body += '<li>Descripción:' + ob.body.descripcion + '</li>';

          sender().then(function(response) {
            /*if (response)
              resolve(true);*/
          });
        //});
      });

    };

    var scalaT = function(ob) {
      sen.body = "Buen día, el ticket N° " + ob.body.n + " ha sido escalado a usted por " + ob.body.tecnico + ". <br><br> ";
      body += ob.body.descripcion + " <br><br>";
    };

    var eco = function(n){

      sen.to = 'soporte@suppliesdc.com';
      sen.subject = 'Pendiente cierre ticket N°'+n;
      sen.body = 'Ticket N°'+n+' ya ha sido solucionado satisfactoriamente queda pendiente el cierre de este.';
      return $q(function(resolve){
        sender().then(function(response) {
          if (response)
            resolve(true);
        });
      });
    };

    var ecoSolicitud = function(ob){
      sen.to = 'soporte@suppliesdc.com';
      sen.subject = 'Solicitud pendiente por crear N°'+ob.n;
      sen.body = 'Hay una solicitud pendiente por crear, solicitud N°'+ob.n;
      return $q(function(resolve){
        sender().then(function(response) {
          if (response)
            resolve(true);
        });
      });
    };

    return {
      nt: newT,
      et: scalaT,
      eco : eco,
      ecoS : ecoSolicitud

    };

  });
