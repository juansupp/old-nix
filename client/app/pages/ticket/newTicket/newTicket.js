'use strict';

angular.module('nixApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('m.newTicket', {
        url: '/newTicket',
        templateUrl: 'app/pages/ticket/newTicket/newTicket.html',
        controller: 'NewTicketCtrl',
        params :{
          t : ''
        }
      });
  });
