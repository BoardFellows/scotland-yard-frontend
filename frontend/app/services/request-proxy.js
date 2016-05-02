(function() {
  angular.module('syServices')
    .factory('requestProxy', ['$log', '$http', requestProxy]);
  
  
  function requestProxy($log, $http) {
    return function requestProxy(method, path, cb, data, headers) {
      $log.info(`proxyService request ${method} ${path}`);
      
      // BUILD THE REQUEST
      let requestParams = {
        method: method.toUpperCase(),
        url: `/requestProxy/${path}`  
      };
      if (data) {
        requestParams.data = data;
      }
      if (headers) {
        requestParams.headers = headers;
      }
      if (sessionStorage.get('authToken')){
        requestParams.headers = {
          token: sessionStorage.get('authToken')
        };
      }
      $log.log('requestParams are ', requestParams);
      
      // MAKE THE REQUEST
      $http(requestParams).then((response) => {
        $log.debug('SUCCESS IN requestProxy');
        cb && cb(null, response.data);
      }, (err) => {
        $log.error('ERROR IN requestProxy: ', err);
        cb && cb(err);
      });
    };
  }
  
})();
