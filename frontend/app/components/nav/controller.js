(function() {
  angular.module('syNav', [])
    .controller('NavbarController', ['$log', '$scope', '$location', '$route', '$window', NavbarController]);
  
  function NavbarController($log, $scope, $location, $route, $window) {
    const vm        = this;
    vm.tab          = 'games';
    vm.checkActive  = checkActive;
    vm.setActive    = setActive;
    vm.logOut       = logOut;
    
    // TODO: make it so that which of these is selected updates with changes in the route
    $scope.$watch(function() {
      return $location.url();
    }, function() {
      vm.tab = $location.url();
    });
    
    function checkActive(tabToCheck) {
      return vm.tab === tabToCheck;
    }
    
    function setActive(newTab) {
      $log.info('NavbarController.tab set to ' + newTab);
      vm.tab = newTab;
    }
    
    function logOut() {
      $log.info('NavbarController logOut');
      $window.sessionStorage.setItem('authToken', angular.toJson(null));
      $window.sessionStorage.setItem('user', angular.toJson(null));  
      $location.url('/login');
      $route.reload();
    }
    
  }
  
})();
