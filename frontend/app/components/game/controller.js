(function() {
  angular.module('syGame', [])
    .controller('GameController', ['$log', '$window', '$location', '$route', '$routeParams', 'makeApiRequest', 'gameState',  GameController]);
  
  
  function GameController($log, $window, $location, $route, $routeParams, makeApiRequest, gameState) {
    const vm        = this;
    vm.gameId       = $routeParams.gameId;
    
    vm.initialize   = initialize;
    
    
    
    
    // THIS WILL BRING IN THE INFORMATION ABOUT THE GAME
    function initialize() {
      $log.info('GameController initialize');
      if (!$window.localStorage.getItem('authToken')) {
        $location.url('/login');
        $route.reload();
      }
      
      
      
      
      
    }
    
  }
  
})();
