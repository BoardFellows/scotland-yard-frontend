(function() {
  angular.module('syServices')
    .factory('gameState', ['$log', '$window', '$timeout', '$routeParams','makeApiRequest', 'rerouteIfNeeded', gameState]);
  
  function gameState($log, $window, $timeout, $routeParams, makeApiRequest, rerouteIfNeeded) {
    const gameState               = {};
    gameState.board               = $window.localStorage.getItem('board') || null;
    gameState.gameId              = null;
    gameState.game                = {};
    gameState.turns               = [];
    gameState.lastUpdated         = null;
    gameState.turnsUntilMrXReveal = null;
    
    gameState.userType            = null;
    gameState.usersTurn           = false;
    gameState.otherUser           = null;
    
    gameState.players             = [];
    gameState.playerToMove        = null;
    
    gameState.createGame          = createGame;
    gameState.initialize          = initialize;
    gameState.buildInitGameState  = buildInitGameState;
    gameState.loadBoard           = loadBoard;
    gameState.loadGame            = loadGame;
    gameState.handleThisTurn      = handleThisTurn;
    gameState.buildBoardThisTurn  = buildBoardThisTurn;
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
      gameState.gameId = $routeParams.gameId;
      
      // CHECK IF NEED TO LOAD BOARD
      if (!gameState.board) {
        gameState.loadBoard(() => {
          // CHECK IF NEED TO LOAD GAME
          if (!gameState.game) {
            gameState.loadGame(gameState.gameId);
          }
        });
        
      } else {
        // CHECK IF NEED TO LOAD GAME
        if (!gameState.game) {
          gameState.loadGame(gameState.gameId);
        }
      }
    }
    
    
    /////////////////////////////////////
    // GET BOARD DATA
    function loadBoard(cb) {
      $log.info('gameState loadBoard');
      var alreadyTried = 1;
      (function tryLoadingBoard() {
        makeApiRequest('GET', 'board/', (err, response) => {
          if (err) {
            $log.error('Could not load the game board');
            if (alreadyTried) {
              $window.sessionStorage.setItem('authToken', null);
              rerouteIfNeeded();
            } else {
              alreadyTried++;
              tryLoadingBoard();
            }
          } else {
            $window.localStorage.setItem('syGameBoard', response.board);
            cb && cb();
          }
          
        });
      })();
      
    }
    
    
    /////////////////////////////////////
    // BRING A GAME IN FROM THE DATABASE
    function loadGame(gameId) {
      $log.info('gameState loadGame');
      
    }
    
    /////////////////////////////////////
    // HANDLES ALL THE CHANGES MADE AT THE START OF A TURN
    function handleThisTurn() {
      $log.info('gameState handleThisTurn');
      
      
    }
    
    /////////////////////////////////////
    // BUILD THE BOARD FOR THE CURRENT TURN
    function buildBoardThisTurn() {
      $log.info('gameState buildBoardThisTurn');
      
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
        
        makeApiRequest('GET', `games/${gameState.gameId}/`, (err, response) => {
          if (err) {
            $log.error(err);
            gameState.pollDbForUpdate();
          } else {
            // THE OTHER USER HAS MOVED
            if (response.lastUpdated === gameState.lastUpdated) {
              gameState.handleThisTurn(response);
            } else {
              // CHECK EVERY MINUTE WHETHER THERE HAS BEEN A CHANGE
              $timeout(gameState.pollDbForUpdate, 60000);
            }
          }
        });
        
      })();
      
    }
    
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    return gameState;
  }
  
})();
