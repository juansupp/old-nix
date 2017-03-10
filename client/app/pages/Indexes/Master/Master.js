'use strict';

angular.module('nixApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('m.Master', {
        url: '/Master',
        templateUrl: 'app/pages/Indexes/Master/Master.html',
        controller: 'MasterCtrl'
      });
  });
