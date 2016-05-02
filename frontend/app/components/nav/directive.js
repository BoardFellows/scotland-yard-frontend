(function() {
  angular.module('syNavModule')
    .directive('syNavbar', syNavbar);
    
  function syNavbar() {
    return {
      restrict: 'E',
      templateUrl: 'components/nav/nav-view.html',
      controller: 'NavbarController',
      controllerAs: 'navCtrl'
    };
  }
  
})();
