(function() {
  angular.module('syLogin', ['syServices'])
    .controller('LoginController', ['$log', 'loginService', LoginController]);
    
  function LoginController($log) {
    const vm                    = this;
    vm.test                     = null;
    
    // LOGIN
    vm.user                     = {};
    vm.user.username            = null;
    vm.user.password            = null;
    
    // ACCOUNT CREATION
    vm.newUser                  = {};
    vm.newUser.username         = null;
    vm.newUser.email            = null;
    vm.newUser.password         = null;
    vm.newUser.passwordConfirm  = null;
    
    // FORM VISIBILITY
    vm.loginFormVisable         = true;
    vm.createUserFormVisable    = false;

    // CONTROLLER METHODS
    vm.initialize               = initialize;
    vm.toogleWhichFormIsVisable = toogleWhichFormIsVisable;
    vm.loginUser                = loginUser;
    vm.createUser               = createUser;
    
    
    
    /////////////////////////////////////
    // METHODS
    /////////////////////////////////////
    
    
    
    function toogleWhichFormIsVisable() {
      $log.info('toogleWhichFormIsVisable');
      vm.loginFormVisable         = !vm.loginFormVisable;
      vm.createUserFormVisable    = !vm.createUserFormVisable;
      vm.username                 = null;
      vm.password                 = null;
      vm.newUser.username         = null;
      vm.newUser.email            = null;
      vm.newUser.password         = null;
      vm.newUser.passwordConfirm  = null;
    }
    
    function initialize() {
      vm.loginFormVisable       = true;
      vm.createUserFormVisable  = false;
    }
    
    
    function loginUser() {
      $log.info('loginUser');
      
    }
    
    function createUser() {
      $log.info('createUser');
      
    }
    
    
  }
  
})();
