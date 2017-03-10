'use strict';

angular.module('nixApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('m.mconf.confTicket', {
        url: '/confTicket',
        data: {
          'selectedTab': 0
        },
        views: {
          'confTicket': {
            templateUrl: 'app/pages/config/confTicket/confTicket.html',
            controller: 'ConfTicketCtrl'
          }
        }
      });
  });
