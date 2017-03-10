'use strict';

angular.module('nixApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('m.mconf.confInventario', {
        url: '/confInventario',
        data: {
          'selectedTab': 1
        },
        views: {
          'confInventario': {
            templateUrl: 'app/pages/config/confInventario/confInventario.html',
            controller: 'ConfInventarioCtrl'
          }
        }
      });
  });
