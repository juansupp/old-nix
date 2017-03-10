'use strict';

angular.module('nixApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('m.mc.queryC', {
        url: '/queryC',
        data: {
          'selectedTab': 1
        },
        views : {
          'queryC' :{
              controller: 'QueryCCtrl',
              templateUrl: 'app/pages/admin/customers/queryC/queryC.html',
          }
        }
      });
  });
