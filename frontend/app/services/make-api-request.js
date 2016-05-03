(function() {
  angular.module('syServices')
    .factory('makeApiRequest', ['$log', '$http', makeApiRequest]);
  
  
  function makeApiRequest($log, $http) {
    return function makeApiRequest(method, path, cb, data, headers) {
      $log.info(`proxyService request ${method} ${path}`);
      
      // BUILD THE REQUEST
      let requestParams = {
        method: method.toUpperCase(),
        url: `http://ec2-52-27-31-102.us-west-2.compute.amazonaws.com/${path}`  
      };
      if (data) { 
        requestParams.data = data;
      }
      // USEFUL FOR LOG IN ONLY
      if (headers) {
        requestParams.headers = headers;
      }
      // AUTOMATICALLY ADDS authToken if it's available
      if (sessionStorage.getItem('authToken')){
        requestParams.headers = {
          token: sessionStorage.getItem('authToken')
        };
      }
      $log.log('requestParams are ', requestParams);
      
      // MAKE THE REQUEST
      $http(requestParams).then((response) => {
        $log.debug('SUCCESS IN makeApiRequest');
        $log.log(response);
        cb && cb(null, response.data);
      }, (err) => {
        $log.error('ERROR IN makeApiRequest: ', err);
        cb && cb(err);
      });
    };
  }
  
})();
