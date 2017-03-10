'use strict';

angular.module('nixApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('m.mu.addU', {
        url: '/addU',
        data: {
          'selectedTab': 0
        },
        views : {
          'addU':{
            templateUrl: 'app/pages/admin/user/addU/addU.html',
            controller: 'AddUCtrl'
          }
        }
      });
  });
