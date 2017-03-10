'use strict';

angular.module('nixApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('m.mconf.confUser', {
        url: '/confUser',
        data: {
          'selectedTab': 2
        },
        views: {
          'confUser': {
            templateUrl: 'app/pages/config/confUser/confUser.html',
            controller: 'ConfUserCtrl'
          }
        }

      });
  });
