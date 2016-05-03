(function() {
  angular.module('syServices')
    .factory('rerouteIfNeeded', ['$log', '$window', '$route', '$location', rerouteIfNeeded]);
    
  function rerouteIfNeeded($log, $window, $route, $location) {
    return function(){
      if (!$window.sessionStorage.getItem('authToken')) {
        $location.url('/login');
        $route.reload();
      }
    };
  }
    
})();
