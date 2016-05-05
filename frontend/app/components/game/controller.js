/* global google */

(function() {
  angular.module('syGame', ['syNav', 'syServices'])
    .controller('GameController', ['$log', '$routeParams', '$window', '$document', 'makeApiRequest', 'rerouteIfNeeded', 'gameState', GameController]);
  
  
  function GameController($log, $routeParams, $window, $document, makeApiRequest, rerouteIfNeeded, gameState) {
    /////////////////////////////////////
    // ATTACH CONTROLLER PORPERTIES
    /////////////////////////////////////
    
    const vm                          = this;
    vm.gameId                         = $routeParams.gameId;
    vm.showBoard                      = false;
    vm.initialize                     = initialize;
    
    // REQUIRE IN BOARD HELPER LIB
    vm.mapStyle                       = require(__dirname + '/board/map-options.js');
    vm.coords                         = require(__dirname + '/board/coords.js');
    vm.nodeSvg                        = require(__dirname + '/board/node-svg.js');
    vm.playerSvg                      = require(__dirname + '/board/player-svg.js');
    
    // MAP RELATED 
    vm.map                            = null; 
    vm.mapHolder                      = angular.element(document.querySelector('#map_canvas'))[0];
    
    // OBJECTS DRAWN ONTO MAP, NODES STORED ON vm.coords
    vm.playerMarkers                  = {};
    vm.edgePolylines                  = {};
    vm.infoWindow                     = null;
    
    /////////////////////////////////////
    // ATTACH CONTROLLER METHODS
    /////////////////////////////////////
    
    // INITIALIZATION METHODS
    vm.initialize                     = initialize;
    vm.callAllMapInitMethods          = callAllMapInitMethods;
    vm.initializeMap                  = initializeMap;
    vm.initializeNodesOntoMap         = initializeNodesOntoMap;
    vm.initializeEdgesOntoMap         = initializeEdgesOntoMap;
    vm.initializePlayersOntoMap       = initializePlayersOntoMap;
    vm.initializeMapEventListeners    = initializeMapEventListeners;
    
    // EVERY ROUND METHODS
    vm.handleThisTurn                 = handleThisTurn;
    vm.showMovesFromNode              = showMovesFromNode;
    vm.attemptToMoveToNode            = attemptToMoveToNode;
    vm.askForTokenType                = askForTokenType;
    vm.processPayment                 = processPayment;
    vm.drawPlayerAtNode               = drawPlayerAtNode;
    
    // GAMEPLAY METHODS
    vm.limitViewableMapArea           = limitViewableMapArea;
    vm.attachMapClickHandlers         = attachMapClickHandlers;

    

    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    // METHODS
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    
    
    /////////////////////////////////////
    // INITIALIZATION METHODS
    /////////////////////////////////////
    
    
    // THIS WILL BRING IN THE INFORMATION ABOUT THE GAME
    function initialize() {
      $log.info('GameController initialize');
      $log.log(gameState.board);
      rerouteIfNeeded();  
      gameState.initialize()
        .then((responseBoardAndGameArray) => {
          $log.log('going to show board');
          vm.showBoard = true;
          vm.callAllMapInitMethods();
          vm.handleThisTurn();
        })
        .catch((err) => {
          $log.error('ERROR IN CATCH BLOCK FOR ALL MAP INIT METHODS');
          $log.error(err);
          $window.sessionStorage.setItem('authToken', angular.toJson(null));
          $window.sessionStorage.setItem('user', angular.toJson(null));
          rerouteIfNeeded();
        });
    }
    
    
    // THIS WILL BUILD AND RENDER THE GAME MAP
    function callAllMapInitMethods() {
      $log.info('GameController callAllMapInitMethods');
      vm.initializeMap();
      vm.initializeNodesOntoMap();
      vm.initializeEdgesOntoMap();
      vm.initializePlayersOntoMap();
      vm.initializeMapEventListeners();
    }
    
    // THIS DRAWS THE MAP
    function initializeMap() {
      $log.info('GameController initializeMap');
      vm.map = new google.maps.Map({
        center:             new google.maps.LatLng(51.506393, -0.127739), 
        zoom:               14, 
        minZoom:            13, 
        maxZoom:            16,
        mapTypeId:          google.maps.MapTypeId.ROADMAP, 
        styles:             vm.mapStyle,
        disableDefaulUI:    true,
        zoomControl:        true,
        mapTypeControl:     false,
        scaleControl:       true,
        streetViewControl:  false,
        rotateControl:      false,
        fullScreenControl:  false
      });
    }

    
    // DRAWS ALL NODES ONTO THE MAP
    function initializeNodesOntoMap() {
      $log.info('GameController drawNodesOntoMap');
      gameState.nodeList.forEach((node) => {
        let markerInfo = vm.coords(node);
        markerInfo.marker = new google.maps.Marker({
          position: new google.maps.LatLng(markerInfo.coords[0], markerInfo.coords[1]),
          map: vm.map,
          icon: {
            url: vm.nodeSvg(node, gameState.board[node]),
            anchor: new google.maps.Point(16, 16)
          }
        });
      });
    }
    
    
    // DRAWS ALL PATHS ONTO THE MAP
    function initializeEdgesOntoMap() {
      $log.info('GameController drawEdgesOntoMap');
      
    }
    
    
    // DRAWS ALL INITIAL PLAYER POSITIONS ONTO MAP 
    function initializePlayersOntoMap() {
      $log.info('GameController drawInitialPlayers');
      
    }
    
    
    // ATTACHES ALL LISTENERS TO THE MAP
    function initializeMapEventListeners() {
      $log.info('GameController attachListeners');
      
    }
    
    
    /////////////////////////////////////
    // EVERY ROUND METHODS
    /////////////////////////////////////
    
    // HIGHLIGHTS THE PATHS AVAILABLE FROM A GIVEN NODE
    function handleThisTurn() {
      $log.info('GameController handleThisTurn');
      
    }
    
    
    // HIGHLIGHTS THE PATHS AVAILABLE FROM A GIVEN NODE
    function showMovesFromNode() {
      $log.info('GameController showMovesFromNode');
      
    }
    
    
    // HANDLES A USER'S INITIAL ATTEMPT TO MOVE TO A NODE
    function attemptToMoveToNode(nodeId) {
      $log.info('GameController attemptToMoveToNode');
      
    }
    
    
    // IF THERE ARE MULTIPLE WAYS TO GET TO A DESIRED NODE, ASKS FOR TYPE OF PAYMENT
    function askForTokenType() {
      $log.info('GameController askForTokenType');
      
    }
    
    
    // RUNS ONCE A PLAYER HAS SELECTED THEIR PAYMENT TYPE
    function processPayment() {
      $log.info('GameController processPayment');
      
    }
    
    
    // DRAWS THE PLAYER AT THE SPECIFIED NODE
    function drawPlayerAtNode(playerId, nodeId) {
      $log.info('GameController drawPlayerAtNode');
      
    }
    
    
    
    /////////////////////////////////////
    // MAP CONTROL METHODS
    /////////////////////////////////////
    
    
    
    // PREVENTS THE PLAYER FROM GOING TO ANOTHER AREA OF THE MAP
    function limitViewableMapArea() {
      $log.info('GameController limitViewableArea');
      
    }
    
    
    // Attaches the click listeners to the map
    function attachMapClickHandlers() {
      $log.info('GameController limitViewableArea');
      
    }
    
    
    
    
    
    
  }
  
})();
