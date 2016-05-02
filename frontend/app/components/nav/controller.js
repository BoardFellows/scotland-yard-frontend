(function() {
  angular.module('syNavModule', [])
    .controller('NavbarController', ['$log', NavbarController]);
  
  function NavbarController($log) {
    const vm        = this;
    vm.tab          = 'games';
    vm.checkActive  = checkActive;
    vm.setActive    = setActive;
    
    function checkActive(tabToCheck) {
      return vm.tab === tabToCheck;
    }
    
    function setActive(newTab) {
      $log.info('NavbarController.tab set to ' + newTab);
      vm.tab = newTab;
    }
    
  }
  
})();
