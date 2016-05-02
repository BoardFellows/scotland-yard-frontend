(function(){
  
  angular.module('syServices')
    .factory('loginService', ['$log', '$http', loginService]);
  
  function loginService($log, $http) {
    const loginService      = {};
    
    
    loginService.loginUser  = loginUser;
    loginService.createUser = createUser;
    
    
    
    /////////////////////////////////////
    // METHODS
    /////////////////////////////////////
    
    function loginUser(username, password, cb) {
      
    }
    
    function createUser(username, password, cb) {
      
    }
    
    return loginService;
  }
  
})();
