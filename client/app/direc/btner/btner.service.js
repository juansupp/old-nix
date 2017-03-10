'use strict';

(function() {

  angular.module('nixApp')
    .service('btnerService', btnerService);

  function btnerService($mdDialog, bifrost) {

    return {
      doTheAction: doTheAction,
      returnData : returnData,
      returnColumns : returnColumns
    };

    var key = '';
    var table = table;

    function doTheAction(_key, action, ev) {
      key = _key;
      if (action.indexOf("see") !== -1) {
        table = action.replace('see', '');
        openCustomDialog(ev);
      } else if (action.indexOf("redirect") !== -1) {
        var route = action.replace('redirect', '');
        $state.go(route, {
          key: key
        });
      } else if (action.indexOf("add") !== -1) {
        table = action.replace('add', '');
        openCustomDialog(ev);
      }
    }

    function returnColumns() {
      //RETORNA 1 OBJECTO

      var w = `table_name = N'${table}'`;
      var obQuery = {
        table: `INFORMATION_SCHEMA.COLUMNS`,
        val: `column_name`,
        where: w
      };
      return bifrost.s(obQuery);
    }

    function returnData (){
      //RETORNA 1 OBJECTO

      var w = "id_" + table + " = "+ key ;
      var obQuery = {
        table: table,
        val: '*',
        where: w
      };
      return bifrost.s(obQuery);
    }

    

    function openCustomDialog(ev) {

      let _controller = `dialogSeeCtrl`, _action = `see`;
      let dialogAttrs = {
        controller: _controller,
        templateUrl: `app/direc/dialoger/${_action}/dialoger.html`,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
      };
      $mdDialog.show(dialogAttrs)
        .then(function(answer) {
          console.log(answer);
          //ANSWER IS YES
        }, function() {
          //ANSWER IS NO
          console.log('??');
        });
    }
  }

})();
