/* global google */
// TODO: figure out how to bring in xml stylesheets to specify the styling


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
    vm.infoWindowContent              = require(__dirname + '/board/info-window.js');
    
    // MAP RELATED 
    vm.map                            = null;
    vm.mapHolder                      = angular.element(document.querySelector('#map_canvas'))[0];
    vm.viewBounds                     = new google.maps.LatLngBounds(
      new google.maps.LatLng(51.48066238846036, -0.19279329744723128),
      new google.maps.LatLng(51.54394811922664, -0.07118730513003158)
    ); 
    vm.lastValidMapCenter             = vm.viewBounds.getCenter();
    
    // OBJECTS DRAWN ONTO MAP, NODES STORED ON vm.coords
    vm.playerMarkers                  = {};
    vm.edgePolylines                  = {};
    vm.infoWindow                     = new google.maps.InfoWindow();
    
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
    vm.drawEdgesFromNode              = drawEdgesFromNode;
    
    // GAMEPLAY METHODS
    vm.limitViewableMapArea           = limitViewableMapArea;
    vm.attachMapClickHandlers         = attachMapClickHandlers;

    // DRAWING METHODS AND STYLES
    vm.markerStyles                   = {};
    vm.colors                         = {
      river:        '#15171C',
      taxi:         '#1A2944',
      underground:  '#E11627',
      bus:          '#77CFDE',
      outline:      '#191C26',
      fill:         '#FFFFFF'
    };
    vm.markerStyles.nodeStyle         = nodeStyle;
    vm.markerStyles.edgeStyle         = edgeStyle;
    vm.markerStyles.playerStyle       = {
      det1:   { color: '#EB6528' },
      det2:   { color: '#FC9D1C' },
      det3:   { color: '#FFD97B' },
      det4:   { color: '#9E332E' }, 
      det5:   { color: '#AF2511' },
      mrx:    { color: '#15171C' },
      width:  24,
      height: 24
    };
    
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
      if (!gameState.game || !gameState.board) {
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
            // $window.sessionStorage.setItem('authToken', angular.toJson(null));
            // $window.sessionStorage.setItem('user', angular.toJson(null));
            // rerouteIfNeeded();
          });
      } else {
        vm.showBoard = true;
        vm.callAllMapInitMethods();
        vm.handleThisTurn();
      }
       
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
      vm.map = new google.maps.Map(vm.mapHolder, 
        {
          center:             vm.viewBounds.getCenter(),    
          zoom:               13, 
          minZoom:            13, 
          maxZoom:            17,
          mapTypeId:          google.maps.MapTypeId.ROADMAP, 
          styles:             vm.mapStyle,
          disableDefaulUI:    true,
          zoomControl:        true,
          mapTypeControl:     false,
          scaleControl:       true,
          streetViewControl:  false,
          rotateControl:      false,
          fullScreenControl:  false
        }
      );
      $log.log(vm.map);
    }

    
    // DRAWS ALL NODES ONTO THE MAP
    function initializeNodesOntoMap() {
      $log.info('GameController drawNodesOntoMap');
      gameState.nodeList.forEach((node) => {
        let markerInfo = vm.coords[node];
        markerInfo.marker = new google.maps.Marker({
          position: new google.maps.LatLng(markerInfo.coords),
          map:      vm.map,
          icon: {
            url:    vm.nodeSvg(node, gameState.board[node], vm.markerStyles.nodeStyle),
            anchor: new google.maps.Point(20, 20)
          }
        });
        // TODO: attach click event listeners here?
        vm.attachMapClickHandlers(markerInfo.marker, node);
      });
    }
    
    
    // DRAWS ALL PATHS ONTO THE MAP
    function initializeEdgesOntoMap() {
      $log.info('GameController drawEdgesOntoMap');
      gameState.nodeList.forEach((nodeName) => {
        let node        = gameState.board[nodeName];
        var otherNodes  = {};
        gameState.edgeTypes.forEach((type) => {
          node[type].forEach((otherNodeName) => {
            if (otherNodes[otherNodeName]) {
              otherNodes[otherNodeName][type] = true;
            } else {
              otherNodes[otherNodeName] = {};
              otherNodes[otherNodeName][type] = true;
            }
          });
        });
        $log.log(nodeName, otherNodes);
        Object.keys(otherNodes).forEach((otherNodeName) => {
          if (!vm.edgePolylines[`${otherNodeName}-${nodeName}`]) {
            let edgeOptions = vm.markerStyles.edgeStyle(
              vm.coords[nodeName].coords, 
              vm.coords[otherNodeName].coords, 
              otherNodes[otherNodeName].taxi,
              otherNodes[otherNodeName].bus,
              otherNodes[otherNodeName].underground,
              otherNodes[otherNodeName].river
            );
            let edge = new google.maps.Polyline(edgeOptions);
            vm.edgePolylines[`${otherNodeName}-${nodeName}`] = edge;
            vm.edgePolylines[`${nodeName}-${otherNodeName}`] = edge;
          }
        });
      });
    }
    
    function drawEdgesFromNode() {
      $log.info('GameController drawEdgesFromNode');
      
    }
    
    
    // DRAWS ALL INITIAL PLAYER POSITIONS ONTO MAP 
    function initializePlayersOntoMap() {
      $log.info('GameController drawInitialPlayers');
      $log.log(gameState.game);
      let rounds    = gameState.game.rounds;
      let lastRound = rounds[rounds.length - 1];
      Object.keys(lastRound).forEach((key) => {
        let match = key.match(/(.+)_loc/i);
        if (match && match.length) {
          //TODO: implement if statement to only show mr.x if gameState.mrxVisible is true
          let occupiedNodeName  = lastRound[key];
          let coordinates       = vm.coords[occupiedNodeName].coords;
          let marker            = new google.maps.Marker({
            position: coordinates,
            map: vm.map,
            icon: {
              url: vm.playerSvg(match[1], vm.markerStyles.playerStyle),
              anchor: new google.maps.Point(20, 20)
            }
          });
          vm.playerMarkers[match[1]] = marker;
        }
      });
    }
    
    
    // ATTACHES ALL LISTENERS TO THE MAP
    function initializeMapEventListeners() {
      $log.info('GameController attachListeners');
      vm.limitViewableMapArea();
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
    function processPayment(mode) {
      $log.info(`GameController processPayment ${mode}`);
      
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
      vm.map.addListener('center_changed', function() {
        let viewCenter = vm.map.getCenter();
        if (!vm.viewBounds.contains(viewCenter)) {
          vm.map.setCenter(vm.lastValidMapCenter);
        } else {
          vm.lastValidMapCenter = viewCenter;
        }
      });
    }
    
    
    // Attaches the click listeners to the map
    function attachMapClickHandlers(marker, clickedNodeName) {
      $log.info('GameController attachMapClickHandlers');
      marker.addListener('click', function() {
        // TODO: fix this method to figure out which player's turn it is, not always use det1
        let originNodeName  = gameState.rounds[gameState.rounds.length - 1]['det1_loc'];
        let originNode      = gameState.board[originNodeName];
        $log.info(clickedNodeName, originNodeName);
        $log.log(originNode);
        // $log.log(originNode.taxi.indexOf(+clickedNodeName));
        // $log.log(originNode.bus.indexOf(+clickedNodeName));
        // $log.log(originNode.underground.indexOf(+clickedNodeName));
        // $log.log(originNode.river.indexOf(+clickedNodeName));
        let taxi            = (originNode.taxi.indexOf(+clickedNodeName) !== -1);
        let bus             = (originNode.bus.indexOf(+clickedNodeName) !== -1);
        let underground     = (originNode.underground.indexOf(+clickedNodeName) !== -1);
        let river           = (originNode.river.indexOf(+clickedNodeName) !== -1);
        let connectedFlag   = ( taxi || bus || underground || river );
        // $log.warn(taxi, bus, underground, river, connectedFlag); 
        if (connectedFlag) {
          let content       = vm.infoWindowContent(originNodeName, originNode, clickedNodeName, gameState.board[clickedNodeName], vm.processPayment, $log.log);
          vm.infoWindow.setContent(content);
          vm.infoWindow.open(vm.map, marker);
        }
      });
    }
    
    /////////////////////////////////////
    // MAP DRAWING METHODS
    /////////////////////////////////////
    
    // RETURNS A SPEC OBJECT FOR EDGES
    function edgeStyle(latlng1, latlng2, taxi, bus, underground, river) {
      $log.info(`edgeStyle called, taxi: ${taxi}, bus: ${bus}, underground: ${underground}`);
      let number = 0;
      if (taxi)         number++;
      if (bus)          number++;
      if (underground)  number++;
      if (river)        number++;
      $log.log(`${number} land routes being drawn.`);
      let repeat = 24 / number;
      let offset = 0;
      function returnDashedLineSpec(color, offset) {
        return {
          offset: `${offset}`,
          repeat: repeat + 'px',
          icon: {
            strokeOpacity:    1,
            scale:            2, 
            path:             'M 0,-1 0,1',
            strokeLinecap:    'butt',
            strokeColor:      color
          }
        };
      }
      let iconsArray = [];
      if (taxi) {
        iconsArray.push(returnDashedLineSpec(vm.colors.taxi, offset));
        offset += repeat;
      }
      if (bus) {
        iconsArray.push(returnDashedLineSpec(vm.colors.bus, offset));
        offset += repeat;
      }
      if (underground) {
        iconsArray.push(returnDashedLineSpec(vm.colors.underground, offset));
        offset += repeat;
      }
      if (river) {
        iconsArray.push(returnDashedLineSpec(vm.colors.river, offset));
        offset += repeat;
      }
      return {
        path:           [latlng1, latlng2],
        strokeOpacity:  0,
        map:            vm.map,
        icons:          iconsArray
      };
    }
    
    
    // defines the color styling for a node marker svg
    // TODO: respec this so that it can put in other values for redrawing as appropriate for highlighting
    function nodeStyle(node) {
      return {
        height:         20,
        width:          20, 
        strokeWidth:    2,
        topColor:       vm.colors.taxi,
        boxFill:        vm.colors.fill, 
        textStroke:     vm.colors.outline,     
        botColor:       (node.bus.length) ? vm.colors.bus : vm.colors.taxi,
        outlineColor:   (node.underground.length) ? vm.colors.underground : vm.colors.outline,
        boxStroke:      (node.underground.length) ? vm.colors.underground : vm.colors.outline
      };
    }
    
    
    
  }
  
})();
