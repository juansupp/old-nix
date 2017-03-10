'use strict';

angular.module('nixApp', [
    'nixApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ngMaterial',
    'ngMessages',
    'datatables',
    'lumx',
    'dndLists',
    'datatables.columnfilter'
    //'ngMdIcons'
  ])
  .config(function($urlRouterProvider, $locationProvider, $mdThemingProvider) {
    $urlRouterProvider
      .otherwise('/');
    $mdThemingProvider.theme('default')
      .primaryPalette('cyan')
      .accentPalette('orange');
    $locationProvider.html5Mode(true);
  });
