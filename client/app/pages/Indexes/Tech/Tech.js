'use strict';

angular.module('nixApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('m.Tech', {
        url: '/Tech',
        templateUrl: 'app/pages/Indexes/Tech/Tech.html',
        controller: 'TechCtrl'
      });
  });
