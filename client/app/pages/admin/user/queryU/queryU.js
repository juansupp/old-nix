'use strict';

angular.module('nixApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('m.mu.queryU', {
        url: '/queryU',
        data : {
          'selectedTab' : 1
        },
        views : {
          'queryU' : {
            templateUrl: 'app/pages/admin/user/queryU/queryU.html',
            controller: 'QueryUCtrl'
          }
        }
      });
  });
