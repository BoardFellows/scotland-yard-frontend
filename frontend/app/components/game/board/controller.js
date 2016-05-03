/* global google */ 

(function() {
  angular.module('syGame')
    .controller('BoardController', ['$log', 'gameState', BoardController]);
    
  function BoardController($log, gameState) {
    const vm                = this;
    const mapStyle          = require(__dirname + '/map-options.js');
    
    // MAP RELATED
    vm.map                  = null;
    vm.mapHolder            = document.getElementById('#map_canvas');
    
    // OBJECTS DRAWN ONTO MAP
    vm.playerMarkers        = [];
    vm.infoWindow           = null;
    
    // SETUP METHODS
    vm.intitialize          = initialize;
    vm.drawIntialMap        = drawIntialMap;
    vm.drawNodesOntoMap     = drawNodesOntoMap;
    vm.drawEdgesOntoMap     = drawEdgesOntoMap;
    vm.drawInitialPlayers   = drawInitialPlayers;
    vm.attachListeners      = attachListeners;
    
    // DRAWING METHODS
    vm.showMovesFromNode    = showMovesFromNode;
    vm.drawPlayerAtNode     = drawPlayerAtNode;
    vm.limitViewableArea    = limitViewableArea;
    
    // GAMEPLAY METHODS
    vm.attemptToMoveToNode  = attemptToMoveToNode;
    vm.askForTokenType      = askForTokenType;
    vm.processPayment       = processPayment;
    
    
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    // METHODS
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    
    
    /////////////////////////////////////
    // THIS WILL BUILD AND RENDER THE GAME MAP
    function initialize() {
      gameState.initialize(() => {
        vm.drawIntialMap();
        vm.drawNodesOntoMap();
        vm.drawEdgesOntoMap();
        vm.drawInitialPlayers();
        let firstPlayer = gameState.getNextPlayerToMove();
        vm.showMovesFromNode(firstPlayer.node.id); //TODO: make sure this formatting is consistent with theirs
        vm.attachListeners();
      });
      
    }
    
    function drawIntialMap() {
      vm.map = new google.maps.Map({
        center: new google.maps.LatLng(51.506393, -0.127739), 
        zoom: 14, 
        minZoom: 13, 
        maxZoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP, 
        styles: mapStyle,
        disableDefaulUI: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullScreenControl: false
      });
    }
    
    /////////////////////////////////////
    // DRAWS THE NODES ONTO THE MAP TO START WITH
    function drawNodesOntoMap() {
      
    }
    
    /////////////////////////////////////
    // DRAWS PATHS ONTO THE MAP TO START WITH
    function drawEdgesOntoMap() {
      
    }
    
    /////////////////////////////////////
    // DRAWS INITIAL PLAYER POSITIONS ONTO MAP TO START WITH
    function drawInitialPlayers() {
      
    }
    
    /////////////////////////////////////
    // ATTACHES THE LISTENERS TO THE MAP
    function attachListeners() {
      
    }
    
    /////////////////////////////////////
    // HIGHLIGHTS THE PATHS AVAILABLE FROM A GIVEN NODE
    function showMovesFromNode() {
      
    }
    
    /////////////////////////////////////
    // HANDLES A USER'S INITIAL ATTEMPT TO MOVE TO A NODE
    function attemptToMoveToNode(nodeId) {
      
    }
    
    /////////////////////////////////////
    // IF THERE ARE MULTIPLE WAYS TO GET TO A DESIRED NODE, ASKS FOR TYPE OF PAYMENT
    function askForTokenType() {
      
    }
    
    /////////////////////////////////////
    // RUNS ONCE A PLAYER HAS SELECTED THEIR PAYMENT TYPE
    function processPayment() {
      
    }
    
    /////////////////////////////////////
    // DRAWS THE PLAYER AT THE SPECIFIED NODE
    function drawPlayerAtNode(playerId, nodeId) {
      
    }
    
    /////////////////////////////////////
    // PREVENTS THE PLAYER FROM GOING TO ANOTHER AREA OF THE MAP
    function limitViewableArea() {
      
    }
    
  }  
  
})();
