'use strict';
(function(){

class HojaVidaComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('nixApp')
  .component('hojaVida', {
    templateUrl: 'app/pages/inventario/hojaVida/hojaVida.html',
    controller: HojaVidaComponent
  });

})();
