(function() {
  angular.module('syGames')
    .directive('gameSummary', gameSummary);
  
  function gameSummary() {
    return {
      restrict: 'E', 
      templateUrl: 'components/games/game-summary-view.html', 
      controller: 'GameSummaryController', 
      controllerAs: 'sumCtrl', 
      scope: {
        game: '=', 
        joinGameById: '&'
      }
    };
  }
  
})();
