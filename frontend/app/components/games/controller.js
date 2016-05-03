(function() {
  angular.module('syGames', ['syServices'])
    .controller('GamesController', ['$log', '$location', '$route', '$routeParams', 'gameState',  GamesController])
    .controller('GameSummaryController', ['$log', '$scope', GameSummaryController]);
  
  
  
  // CONTROLLER FOR THE NEW GAME / CURRENT GAMES SCREEN
  function GamesController($log, $location, $route, $routeParams, gameState) {
    const vm                    = this;
    vm.createGameFormHidden     = true;
    vm.createGameButText        = 'New Game';
    vm.games                    = [];
    vm.initialize               = initialize;
    vm.toggleCreateGameVisible  = toggleCreateGameVisible;
    vm.joinGameById             = joinGameById;
    vm.createNewGame            = createNewGame;
    
    
    
    /////////////////////////////////////
    // METHODS
    /////////////////////////////////////
    
    /////////////////////////////////////
    // REROUTE TO LOGIN IF NEEDED, OTHERWISE SET GAMES 
    function initialize() {
      $log.info('GamesController initialize');
      if (!sessionStorage.getItem('authToken')) {
        $location.url('/login');
        $route.reload();
      }
      
      // vm.games = 
      
    }
    
    function toggleCreateGameVisible() {
      $log.info('GamesController toggleCreateGameVisible');
      vm.createGameFormHidden = !vm.createGameFormHidden;
      vm.createGameButText = (vm.createGameButText === 'New Game') ? 'Your Games' : 'New Game';
    }
    
    function joinGameById(gameId) {
      $log.info('GamesController joinGameById');
      
      
    }
    
    function createNewGame() {
      $log.info('GamesController createNewGame');
      
      
    }
    
  }
  
  
  // CONTROLLER FOR THE GAME SUMMARY DIRECTIVES
  function GameSummaryController($log, $scope) {
    const vm = this;
    
    
  }
})();
