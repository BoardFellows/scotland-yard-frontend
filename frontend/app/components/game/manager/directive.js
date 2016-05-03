(function() {
  angular.module('syGame')
    .directive('gameManager', gameManager);
  
  function gameManager() {
    return {
      restrict: 'E', 
      templateUrl: 'components/game/manager/manager-view.html',
      controller: 'ManagerController',
      controllerAs: 'mngCtrl'
    };
  }
  
})();
