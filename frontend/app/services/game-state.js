(function() {
  angular.module('syServices')
    .factory('gameState', ['$log', '$timeout', gameState]);
  
  function gameState($log, $timeout) {
    const gameState               = {};
    gameState.board               = localStorage.get('board') || null;
    gameState.lastUpdated         = null;
    gameState.turns               = [];
    gameState.turnsUntilMrXRevel  = 3;
    
    gameState.userType            = null;
    gameState.usersTurn           = false;
    gameState.players             = [];
    gameState.playerToMove        = null;
    
    gameState.createGame          = createGame;
    gameState.initialize          = initialize;
    gameState.loadGame            = loadGame;
    gameState.checkMove           = checkMove;
    gameState.makeMove            = makeMove;
    gameState.getMovesFromNode    = getMovesFromNode;
    gameState.getNextPlayerToMove = getNextPlayerToMove;
    
    
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    // METHODS
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    
    
    /////////////////////////////////////
    // CREATE A NEW GAME
    function createGame() {
      $log.info('gameState createGame');
      
      
    }
    
    /////////////////////////////////////
    // GET ALL DATA NEEDED FOR GAME START
    function initialize(cb) {
      $log.info('gameState initialize');
      // CHECK IF NEED TO LOAD BOARD
      // CHECK IF NEED TO LOAD GAME
      
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
    function pollDatabaseForUpdate() {
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
