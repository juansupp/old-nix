'use strict';

angular.module('nixApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('m.client', {
        url: '/client',
        templateUrl: 'app/pages/Indexes/client/client.html',
        controller: 'ClientCtrl'
      });
  });
