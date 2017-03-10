'use strict';
//import template from './sheet.html';
(function(){

angular.module('nixApp')
  .service('sheetService', sheetService);

  function sheetService ($mdBottomSheet,$mdDialog) {
    var dataRow = new Object();
  	return {
      showSheet:showSheet,
      defineTheAction : defineTheAction,
      showDialog : showDialog,
      dataRow : dataRow
  	};

    function showDialog(ev) {


      var dialogToShow = {
        controller: 'seeEspCtrl',
        templateUrl: 'app/serv/sheet/sub/seeEsp/seeEsp.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      }

      $mdDialog.show(dialogToShow)
      .then(function(answer) {

      }, function() {

      });

    }

    function defineTheAction (ev,dot) {
    var controller = '';
    var url = '';

      switch(dot){

        case  'seeEsp' :
          var controller ='';
          showDialog(ev);
        break;

        case  'redirectHoja' : {
          showDialog(ev);
          break;
        }
        case 'seeActivo' : {

          break;
        }
        default : {

        }
      }
    }

    /*
      btnes = [
        {
          name,
          icon,
          accion
        }
      ]
    */
  	function showSheet (btnes){
      console.log('what')
  		$mdBottomSheet.show({
	      templateUrl: 'app/serv/sheet/sheet.html',
	      controller: 'sheetCtrl',
        locals : {
          btnes : btnes
        }
	    }).then(function(clickedItem) {
	      console.log(clickedItem);
	    });
  	}

  }

})();
