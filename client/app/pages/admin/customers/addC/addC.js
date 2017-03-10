'use strict';

angular.module('nixApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('m.mc.addC', {
        url: '/addC',
        //parent: 'adminCustomers',
        data: {
          'selectedTab': 0
        },
        views: {
          "addC": {
            controller: "AddCCtrl",
            templateUrl: 'app/pages/admin/customers/addC/addC.html',
          }
        }
      });
  });
