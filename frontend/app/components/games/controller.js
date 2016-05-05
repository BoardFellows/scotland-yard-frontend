(function() {
  angular.module('syGames', ['syNav', 'syServices'])
    .controller('GamesController', ['$log', '$window', '$location', '$route', 'rerouteIfNeeded', 'gameState', GamesController])
    .controller('GameSummaryController', ['$log', '$scope', GameSummaryController]);
  
  
  
  // CONTROLLER FOR THE NEW GAME / CURRENT GAMES SCREEN
  function GamesController($log, $window, $location, $route, rerouteIfNeeded, gameState) {
    const vm                    = this;
    vm.createGameFormHidden     = true;
    vm.createGameButText        = 'New Game';
    vm.games                    = [];
    vm.friends                  = [];
    vm.gameCreateorIsMrX        = true;
    vm.otherPlayer              = null;
    vm.errorMessage             = null;
    
    vm.initialize               = initialize;
    vm.toggleCreateGameVisible  = toggleCreateGameVisible;
    vm.createNewGame            = createNewGame;
    
    //TODO: implement friends list
    
    /////////////////////////////////////
    // METHODS
    /////////////////////////////////////
    
    /////////////////////////////////////
    // REROUTE TO LOGIN IF NEEDED, OTHERWISE SET GAMES 
    function initialize() {
      $log.info('GamesController initialize');
      rerouteIfNeeded();
      if (!gameState.user) {
        $log.warn('GRABBED USER INFO FROM SESSION STORAGE.');
        gameState.user  = angular.fromJson($window.sessionStorage.getItem('user'));
        vm.games        = gameState.user.profile.games;
        vm.friends      = gameState.user.profile.friends; 
      }  else {
        $log.warn('ELSE BLOCK');
        $log.log(gameState.user, typeof gameState.user);
        
        vm.games        = gameState.user.profile.games;
        vm.friends      = gameState.user.profile.friends; 
      }
      // $log.log('GamesController initialize gameState.user is: ');
      // $log.log(gameState.user);
      // if (gameState.user) {
      //   $log.warn(' TRUTHY gameState.user');
      // }
      // vm.games    = gameState.user.profile.games;
      // vm.friends  = gameState.user.profile.friends;  
    }
    
    function toggleCreateGameVisible() {
      $log.info('GamesController toggleCreateGameVisible');
      vm.createGameFormHidden = !vm.createGameFormHidden;
      vm.createGameButText    = (vm.createGameButText === 'New Game') ? 'Your Games' : 'New Game';
    }
    
    
    function createNewGame() {
      $log.info('GamesController createNewGame');
      vm.errorMessage = null;
      gameState.createGame(vm.gameCreateorIsMrX, vm.otherPlayer, (err, response) => {
        $log.info('GamesController createNewGame callback');
        if (err) {
          vm.errorMessage = 'There was an error creating your game.';
        } else {
          $location.url(`/games/${gameState.game.id}`);
          $route.reload();
        }
      });
      
    }
    
  }
  
  
  // CONTROLLER FOR THE GAME SUMMARY DIRECTIVES
  function GameSummaryController($log, $scope) {
    // const vm = this;
    
    
  }
  
})();
