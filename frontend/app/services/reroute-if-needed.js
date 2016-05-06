(function() {
  angular.module('syServices')
    .factory('rerouteIfNeeded', ['$log', '$window', '$route', '$location', rerouteIfNeeded]);
    
  function rerouteIfNeeded($log, $window, $route, $location) {
    
    return function rerouteIfNeeded() {
      $log.log('rerouteIfNeeded');
      
      let authToken = angular.fromJson($window.sessionStorage.getItem('authToken'));
      let user      = angular.fromJson($window.sessionStorage.getItem('user'));
      // $log.warn('authToken, user are:');
      // $log.log(authToken, user);

      if (!authToken || !user) {  
        $log.warn('REROUTING TO LOGIN');
        $window.sessionStorage.setItem('authToken', angular.toJson(null));
        $window.sessionStorage.setItem('user', angular.toJson(null));  
        $location.path('/login');
        // $route.reload();
        $log.warn('DONE REROUTING TO LOGIN');

        

      } 

    };
    
  }
  
    
})();
