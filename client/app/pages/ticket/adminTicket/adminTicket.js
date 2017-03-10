'use strict';

angular.module('nixApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('m.adminTicket', {
        url: '/adminTicket',
        templateUrl: 'app/pages/ticket/adminTicket/adminTicket.html',
        controller: 'AdminTicketCtrl'
      });
  }).constant('ESTADOS',[
    {'val':'N','name':'Nuevo'},
    {'val':'P','name':'En proceso'},
    {'val':'V','name':'Pendiente por cierre'},
    {'val':'C','name':'Cerrar'},
    {'val':'H','name':'Hibernación'}
  ]
  );
