'use strict';

angular.module('nixApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('hojaVida', {
        url: '/hojaVida',
        template: '<hoja-vida></hoja-vida>'
      });
  });
