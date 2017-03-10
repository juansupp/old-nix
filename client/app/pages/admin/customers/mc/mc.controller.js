'use strict';

angular.module('nixApp')
  .controller('McCtrl', function ($scope,$rootScope) {
    $rootScope.tit="Gestión de clientes";
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      $scope.currentTab = toState.data.selectedTab;
    });
  });
