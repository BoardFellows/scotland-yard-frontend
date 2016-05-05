(function() {
  angular.module('syGame', ['syNav', 'syServices'])
    .controller('GameController', ['$log', '$routeParams', 'makeApiRequest', 'rerouteIfNeeded', 'gameState', GameController]);
  
  
  function GameController($log, $routeParams, makeApiRequest, rerouteIfNeeded, gameState) {
    const vm        = this;
    vm.gameId       = $routeParams.gameId;
    
    vm.initialize   = initialize;
    
    /////////////////////////////////////
    // METHODS
    /////////////////////////////////////
    
    
    // THIS WILL BRING IN THE INFORMATION ABOUT THE GAME
    function initialize() {
      $log.info('GameController initialize');
      rerouteIfNeeded();
      gameState.loadBoard();
      gameState.loadGame();
    }
    
    
    
    
  }
  
})();
