//'sy-login'

(function(){
  angular.module('syScotlandYard', ['ngRoute', 'syServices', 'syLogin', 'syNav', 'syGame'])
    .config(['$routeProvider', '$locationProvider', mainRouter]);
    
  function mainRouter($routeProvider, $locationProvider) {
    $routeProvider
      /////////////////////////////////////
      // Route for all lists view
      .when('/login', {
        controller:   'LoginController',
        controllerAs: 'loginCtrl',
        templateUrl:  './components/login/login-view.html'
      })
      
      // .when('/games', {
      //   controller:   'GamesController',
      //   controllerAs: 'gamesCtrl',
      //   templateUrl:  './components/games/games-view.html'
      // })
      
      // .when('/games/:gameId', {
      //   controller:   'GameController',
      //   controllerAs: 'gameCtrl',
      //   templateUrl:  './components/game/game-view.html'
      // })
      
      .when('/new-game', {
        controller:   'NewGameController',
        controllerAs: 'newGameCtrl',
        templateUrl:  './components/login/login-view.html'
      })
      
      // .when('/tutorial', {
      //   controller:   'TutorialController',
      //   controllerAs: 'tutCtrl',
      //   templateUrl:  './components/tutorial/tutorial-view.html'
      // })
      
      
      /////////////////////////////////////
      // Redirect to login 
      .otherwise('/', {
        redirectTo: '/login'
      });
      
  }
})();
