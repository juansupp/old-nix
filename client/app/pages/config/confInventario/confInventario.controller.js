'use strict';

angular.module('nixApp')
  .controller('ConfInventarioCtrl', function($scope, excel) {
    $scope.showPreview = false;
    var dataTipo = {};
    $scope.exportTipo = function(files) {
      $scope.sheets = [];
      $scope.excelFile = files[0];
      excel.eB($scope.excelFile, $scope.showPreview).then(function(xlsxData) {
        dataTipo = xlsxData.Hoja1;
        excel.eT(xlsxData.Hoja1);
      });
    };



  });
