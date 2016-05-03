(function() {
  angular.module('syGame')
    .directive('gameBoard', [gameBoard]);
  
  function gameBoard() {
    return {
      restrict: 'E',
      templateUrl: 'components/game/board/view.html',
      controller: 'BoardController', 
      controllerAs: 'boardCtrl'
    };
  }
})();
