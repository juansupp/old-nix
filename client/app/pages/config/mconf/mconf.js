'use strict';

angular.module('nixApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('m.mconf', {
        abstract: true,
        templateUrl: 'app/pages/config/mconf/mconf.html',
        controller: 'MconfCtrl'
      });
  });
