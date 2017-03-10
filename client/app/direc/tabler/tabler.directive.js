(function() {
  'use strict';
  angular.module('nixApp')
    .directive('tabler', tabler);

  function tabler(tablerService, $templateRequest, $compile) {
    return {
      restrict: 'EA',
      scope: {
        struct: '=',
        btnAction : '@',
        scoper : '=',
        where : '='
      },
      link: function(scope, element, attrs) {
        function createdRow(row, data, dataIndex) {
          $compile(angular.element(row).contents())(scope);
        }
        $templateRequest("app/direc/tabler/tabler.html").then(function(html) {

          scope.dtInstance = {};
          scope.dtOptions = tablerService.cargarOptions(scope.struct.table,scope.scoper).withOption('createdRow', createdRow);
          scope.dtColumns = tablerService.cargarColumnas(scope.struct.columns);

          scope.$watch('where', function(newValue) {
            if (newValue){
              scope.dtInstance.changeData(
                tablerService.rePromise(scope.struct.table,newValue)
              );
              
            }
          });


          

          var template = angular.element(html);
          var tFoot = '';
          tFoot += '<tfoot><tr>';
          for (var i = 0; i < scope.struct.columns.length; i++){
            tFoot += '<td></td>';
          }

          tFoot += "</tr>";
          tFoot += "</tfoot>";

          template.append(tFoot);
          element.append(template);
          $compile(template)(scope);
        });
      }
    };
  }
})();
