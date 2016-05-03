(function() {
  angular.module('syNav', [])
    .controller('NavbarController', ['$log', '$scope', '$location', '$route', NavbarController]);
  
  function NavbarController($log, $scope, $location, $route) {
    const vm        = this;
    vm.tab          = 'games';
    vm.checkActive  = checkActive;
    vm.setActive    = setActive;
    
    // TODO: make it so that which of these is selected updates with changes in the route
    $scope.watch(function() {
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
    
  }
  
})();
