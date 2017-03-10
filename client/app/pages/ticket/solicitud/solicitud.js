'use strict';

angular.module('nixApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('m.solicitud', {
        url: '/solicitud',
        templateUrl: 'app/pages/ticket/solicitud/solicitud.html',
        controller: 'SolicitudCtrl'
      });
  });
