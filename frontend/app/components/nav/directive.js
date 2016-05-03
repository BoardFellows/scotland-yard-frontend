(function() {
  angular.module('syNav')
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
