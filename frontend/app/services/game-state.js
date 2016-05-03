(function() {
  angular.module('syServices')
    .factory('gameState', ['$log', '$window', '$timeout', '$routeParams','makeApiRequest', gameState]);
  
  function gameState($log, $window, $timeout, $routeParams, makeApiRequest) {
    const gameState               = {};
    gameState.board               = $window.localStorage.getItem('board') || null;
    gameState.game                = {};
    gameState.turns               = [];
    gameState.lastUpdated         = null;
    gameState.turnsUntilMrXRevel  = 3;
    
    gameState.userType            = null;
    gameState.usersTurn           = false;
    gameState.players             = [];
    gameState.playerToMove        = null;
    
    gameState.createGame          = createGame;
    gameState.initialize          = initialize;
    gameState.buildInitGameState  = buildInitGameState;
    gameState.loadBoard           = loadBoard;
    gameState.loadGame            = loadGame;
    gameState.checkMove           = checkMove;
    gameState.makeMove            = makeMove;
    gameState.getMovesFromNode    = getMovesFromNode;
    gameState.getNextPlayerToMove = getNextPlayerToMove;
    gameState.pollDbForUpdate     = pollDbForUpdate;
    
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    // METHODS 
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    
    
    /////////////////////////////////////
    // CREATE A NEW GAME
    function createGame(currentPlayerRole, otherPlayerEmail, cb) {
      $log.info('gameState createGame');
      
      // TODO: figure out what data needs to be included here
      let newGameObj = {
        currentPlayerRole, 
        otherPlayerEmail
      };
      
      makeApiRequest('POST', 'games/', (err, response) => {
        if (err) {
          $log.error(err);
          
        } else {
          $log.log('SUCCESSFULLY CREATED NEW GAME');
          gameState.buildInitGameState(response);
        }
      }, newGameObj);
    }
    
    /////////////////////////////////////
    // TAKES RESPONSE FROM SERVER AND INITIALIZES VARIABLES
    function buildInitGameState(gameData) {
      $log.info('gameState buildInitGameState');
      gameState.game   = gameData;
      gameState.turns  = gameData.turns;
      
    }
    
    
    /////////////////////////////////////
    // GET ALL DATA NEEDED FOR GAME START
    function initialize(cb) {
      $log.info('gameState initialize');
      // CHECK IF NEED TO LOAD BOARD
      if (!gameState.board) {
        gameState.loadBoard();
      }
      
      // CHECK IF NEED TO LOAD GAME
      if (!gameState.game) {
        gameState.loadGame($routeParams.gameId);
      }
      
    }
    
    
    /////////////////////////////////////
    // GET BOARD DATA
    function loadBoard() {
      $log.info('gameState loadBoard');
      
    }
    
    
    /////////////////////////////////////
    // BRING A GAME IN FROM THE DATABASE
    function loadGame(gameId) {
      $log.info('gameState loadGame');
      
    }
    
    
    /////////////////////////////////////
    // CHECK IF A MOVE IS VALID
    function checkMove(attemptedMove) {
      $log.info('gameState checkMove');
      
      
    }
    
    /////////////////////////////////////
    // PUSH THE MOVE THE DATABASE
    function makeMove() {
      $log.info('gameState makeMove');
      
      
    }
    
    
    /////////////////////////////////////
    // RETURNS THE EDGES THAT NEED TO BE HIGHLIGHTED
    function getMovesFromNode(nodeId) {
      $log.info('gameState getMovesFromNode');
      
    }
    
    
    /////////////////////////////////////
    // FIGURE OUT WHICH PLAYER GETS TO MOVE NEXT
    function getNextPlayerToMove() {
      $log.info('gameState getNextPlayerToMove');
      
    }
    
    
    /////////////////////////////////////
    // ASK THE DATABASE FOR UPDATES ON TIMER UNTIL THE OTHER PLAYER MOVES
    function pollDbForUpdate() {
      $log.info('gameState createGame');
      
      (function poll() {
        $log.info('gameState poll');
        
        
        
        
      })();
      
    }
    
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    return gameState;
  }
  
})();
