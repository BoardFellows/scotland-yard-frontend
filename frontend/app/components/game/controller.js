(function() {
  angular.module('syGame', [])
    .controller('GameController', ['$log', '$routeParams', 'requestProxy',  GameController]);
  
  function GameController($log, $routeParams, requestProxy) {
    const vm = this;
    vm.gameId = $routeParams.gameId;
    
    vm.initialize = initialize;
    
    
    
    // THIS WILL BRING IN THE INFORMATION ABOUT THE GAME
    function initialize() {
      
    }
  }
  
})();
