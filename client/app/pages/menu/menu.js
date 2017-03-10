'use strict';

angular.module('nixApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('m', {
        //url: '/menu',
        abstract : true,
        templateUrl: 'app/pages/menu/menu.html',
        controller: 'MenuCtrl'
      });
  });
