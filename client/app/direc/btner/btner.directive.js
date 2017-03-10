(function() {
  'use strict';
  angular.module('nixApp')
    .directive('btner', btner);

  function btner(btnerService, $templateRequest, $compile) {
    return {
      restrict: 'EA',
      scope: {
        icon : '@',
        key: '=',
        action: '@',
        text : '@'
      },
      link: function(scope, element, attrs) {
        $templateRequest("app/direc/btner/btner.html").then(function(html) {
          scope.btnclick = btnclick;
          function btnclick (ev) {
            console.log(scope.action,scope.key);
            btnerService.doTheAction(scope.key,scope.action,ev);
          }
          var template = angular.element(html);
          element.append(template);
          $compile(template)(scope);
        });
      }
    };
  }
})();
