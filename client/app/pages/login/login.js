'use strict';

angular.module('nixApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'app/pages/login/login.html',
        controller: 'LoginCtrl'
      });
  });
