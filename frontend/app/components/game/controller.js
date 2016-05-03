(function() {
  angular.module('syGame', [])
    .controller('GameController', ['$log', '$routeParams', 'makeApiRequest',  GameController]);
  
  function GameController($log, $routeParams, makeApiRequest) {
    const vm = this;
    vm.gameId = $routeParams.gameId;
    
    vm.initialize = initialize;
    
    
    
    // THIS WILL BRING IN THE INFORMATION ABOUT THE GAME
    function initialize() {
      
    }
  }
  
})();
