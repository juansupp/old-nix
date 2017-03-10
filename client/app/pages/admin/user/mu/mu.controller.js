'use strict';

angular.module('nixApp')
  .controller('MuCtrl', function ($scope,$rootScope) {
    $rootScope.tit='Gestión de usuarios';
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      $scope.currentTab = toState.data.selectedTab;
    });
  });
