(function() {
  angular.module('syLogin', ['syServices'])
    .controller('LoginController', ['$log', '$window', '$location', '$route', 'makeApiRequest', 'gameState', LoginController]);
    
  function LoginController($log, $window, $location, $route, makeApiRequest, gameState) {
    const vm                      = this;
    vm.test                       = null;
    vm.errorMessage               = null;
    
    // LOGIN
    vm.user                       = {};
    vm.user.username              = null;
    vm.user.password              = null;
    
    // ACCOUNT CREATION
    vm.newUser                    = {};
    vm.newUser.username           = null;
    vm.newUser.email              = null;
    vm.newUser.password           = null;
    vm.newUser.passwordConfirm    = null;
    
    // FORM VISIBILITY
    vm.loginFormVisable           = true;
    vm.createUserFormVisable      = false;

    // CONTROLLER METHODS
    vm.initialize                 = initialize;
    vm.toogleWhichFormIsVisable   = toogleWhichFormIsVisable;
    vm.loginUser                  = loginUser;
    vm.createUser                 = createUser;
    
    
    
    /////////////////////////////////////
    // METHODS
    /////////////////////////////////////
    
    
    /////////////////////////////////////
    // RESET ALL VALUES
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
      vm.errorMessage             = null;
    }
    
    
    /////////////////////////////////////
    // REROUTE THEM IF THEY'RE ALREADY LOGGED IN
    function initialize() {
      if ($window.sessionStorage.getItem('authToken')) {
        $location.url('/games');
        $route.reload();
      }  
    }
    
    
    /////////////////////////////////////
    // LOG A USER IN
    function loginUser() {
      $log.info('loginUser');
      try {
        // ELIMINATE INVALID REQUESTS
        if (!(vm.user.username && vm.user.password)) {
          throw new Error('Please fill out your username and password.');
        }
        let authHeaders = {
          authorization: 'Basic ' + $window.btoa(vm.user.username + ':' + vm.user.password)
        };
        
        // MAKE THE REQUEST
        makeApiRequest('GET', 'users/', (err, response) => {
          if (err) {
            throw new Error('There was a problem creating your account.');
          } else {
            delete response.password;
            $window.sessionStorage.setItem('authToken', response.authToken);
            gameState.user = response;
            $location.url('/games');
            $route.reload();
          }
        }, null, authHeaders);
      
      // HANDLE ERRORS    
      } catch (err) {
        $log.error(err);
        vm.errorMessage = err;
      }
      
    }
    
    /////////////////////////////////////
    // CREATE A NEW ACCOUNT
    function createUser() {
      $log.info('createUser');
      try {
        // ELIMINATE INVALID REQUESTS
        if (!(vm.newUser.username && vm.newUser.email && vm.newUser.password && vm.newUser.passwordConfirm)) {
          throw new Error('Please complete filling out the faaorm.');
        } 
        if (vm.newUser.password !== vm.newUser.passwordConfirm) {
          throw new Error('Your passwords must match');
        }
        delete vm.newUser.passwordConfirm;

        // MAKE THE REQUEST
        makeApiRequest('POST', 'users/', (err, response) => {
          if (err) {
            throw new Error('There was a problem creating your account.');
          } else {
            delete response.password;
            $log.log('loginCtrl callback', response);
            $window.sessionStorage.setItem('authToken', response.authToken);
            gameState.user = response; //TODO: figure out a better way to handle storing the user's data
            $location.url('/games');
            $route.reload();
          }
        }, vm.newUser); 
         
      // HANDLE ERRORS  
      } catch (err) {
        $log.error(err);
        vm.errorMessage = err;
      }
    }
    
  }
  
})();
