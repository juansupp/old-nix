'use strict';

angular.module('nixApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('m.perfil', {
        url: '/perfil',
        templateUrl: 'app/pages/perfil/perfil.html',
        controller: 'PerfilCtrl'
      });
  });
