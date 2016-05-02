//'sy-login'

(function(){
  angular.module('syScotlandYard', ['ngRoute', 'syServices', 'syLogin', 'syNavModule'])
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
      //   controller:   'LoginController',
      //   controllerAs: 'loginCtrl',
      //   templateUrl:  './components/login/login-view.html'
      // })
      
      // .when('/games/:gameId', {
      //   controller:   'LoginController',
      //   controllerAs: 'loginCtrl',
      //   templateUrl:  './components/login/login-view.html'
      // })
      
      .when('/new-game', {
        controller:   'NewGameController',
        controllerAs: 'newGameCtrl',
        templateUrl:  './components/login/login-view.html'
      })
      
      // .when('/tutorial', {
      //   controller:   'LoginController',
      //   controllerAs: 'loginCtrl',
      //   templateUrl:  './components/login/login-view.html'
      // })
      
      
      /////////////////////////////////////
      // Redirect to login 
      .otherwise('/', {
        redirectTo: '/login'
      });
      
  }
})();
