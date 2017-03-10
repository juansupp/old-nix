(function() {
  'use strict';
  angular.module('nixApp')
  .directive('selecter', select);

  function select(selectService, $compile, $templateRequest) {
    return {
      restrict: 'EA',
      scope: {
        model: '=',
        table: '@',
        change: '&',
        title: '@',
        attr: '@',
        filter: '='
      },
      link: function(scope, element, attrs) {
        
        scope.$watch('filter', function(newValue) {
          
          if (newValue){
            selectService.start(scope.table,newValue).then(response => {
              scope.lista = response;
            });
          }
        });

        if (!attrs.wait) {
          selectService.start(scope.table).then(response => {
            scope.lista = response;
          });
        }

        $templateRequest("app/direc/select/select.html").then(function(html) {
          var template = angular.element(html);
          template.append("<lx-select-selected>{{ $selected." + scope.attr + " }}</lx-select-selected>" +
            "<lx-select-choices>{{ $choice." + scope.attr + "}}</lx-select-choices>");
          element.append(template);
          $compile(template)(scope);
        });

      }
    };
  }
})();
