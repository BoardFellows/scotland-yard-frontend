(function() {
  angular.module('syServices')
    .factory('gameState', ['$log', '$window', '$timeout', '$routeParams','makeApiRequest', 'rerouteIfNeeded', gameState]);
  
  function gameState($log, $window, $timeout, $routeParams, makeApiRequest, rerouteIfNeeded) {
    const gameState               = {};
    
    // general required information
    gameState.user                = null;
    gameState.board               = angular.fromJson($window.localStorage.getItem('syGameBoard')) ? angular.fromJson($window.localStorage.getItem('syGameBoard')) : null;
    
    // game management
    gameState.gameId              = $routeParams.gameId;
    gameState.game                = null;
    
    // turn management
    gameState.turns               = [];
    gameState.turnsUntilMrXReveal = null;
    gameState.mostRecentETag      = null;
    
    // user/player management
    gameState.userType            = null;
    gameState.usersTurn           = false;
    gameState.otherUser           = null;
    gameState.players             = [];
    gameState.playerToMove        = null;
    
    // 1 time methods
    gameState.createGame          = createGame;
    gameState.initialize          = initialize;
    gameState.buildInitGameState  = buildInitGameState;
    gameState.loadBoard           = loadBoard;
    gameState.loadGame            = loadGame;
    
    // every turn method
    gameState.handleThisTurn      = handleThisTurn;
    gameState.buildBoardThisTurn  = buildBoardThisTurn;
    gameState.checkMove           = checkMove;
    gameState.makeMove            = makeMove;
    gameState.getNextPlayerToMove = getNextPlayerToMove;
    gameState.handleDbResponse    = handleDbResponse;
    gameState.pollDbForUpdate     = pollDbForUpdate;
    
    // more often then 1x per turn
    gameState.getMovesFromNode    = getMovesFromNode;
    
    
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    // METHODS 
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    
    
    /////////////////////////////////////
    // CREATE A NEW GAME
    function createGame(gameCreateorIsMrX, otherPlayer, cb) {
      $log.info('gameState createGame');
      
      // TODO: figure out what data needs to be included here
      let newGameObj = { gameCreateorIsMrX, otherPlayer };
      
      makeApiRequest('POST', 'games/', (err, response) => {
        if (err) {
          $log.error(err);
          cb && cb(err);
        } else {
          $log.log('SUCCESSFULLY CREATED NEW GAME');
          gameState.buildInitGameState(response);
          cb && cb(null, response);
        }
      }, newGameObj);
    }
    
    /////////////////////////////////////
    // GET ALL DATA NEEDED FOR GAME START
    // TODO: put callback in
    function initialize(cb) {
      $log.info('gameState initialize');
      gameState.loadBoard();
      gameState.loadGame(gameState.gameId, () => {
        
      });
    }
    
    
    /////////////////////////////////////
    // TAKES RESPONSE FROM SERVER AND INITIALIZES VARIABLES
    function buildInitGameState(gameData) {
      $log.info('gameState buildInitGameState');
      gameState.game   = gameData;
      gameState.turns  = gameData.turns;
      
    }
    
    
    /////////////////////////////////////
    // BRING A GAME IN FROM THE DATABASE
    function loadGame(gameId, cb) {
      $log.info('gameState loadGame');
      if (!gameState.game) {
        makeApiRequest('GET', `games/${gameState.gameId}`, (err, response) => {
          if (err) {
            cb && cb(err);
          } else {
            $log.info('SUCCESS loading game data by id');
            gameState.buildInitGameState(response);
            cb && cb(null, response);
          }
        }); 
      }
    }
  
    /////////////////////////////////////
    // GET BOARD DATA
    function loadBoard(cb) {
      $log.info('gameState loadBoard');
      if (!gameState.board) {
        let alreadyTried = 1;
        (function tryLoadingBoard() {
          makeApiRequest('GET', 'board', (err, response) => {
            if (err) {
              $log.error('Could not load the game board');
              if (alreadyTried) {
                if (cb) {
                  cb(err);
                } else {
                  $window.sessionStorage.setItem('authToken', angular.toJson(null));
                  $window.sessionStorage.setItem('user', angular.toJson(null));
                  rerouteIfNeeded();
                }
              } else {
                alreadyTried++;
                tryLoadingBoard();
              }
            } else {
              gameState.board = response;
              $window.localStorage.setItem('syGameBoard', angular.toJson(response));
              cb && cb(null, response);
            }
          });
        })();
      }
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
    // HANDLES THE RESPONSE FROM THE DATABASE IN RESPONSE TO A MOVE
    function handleDbResponse(respnse) {
      $log.info('gameState handleDbResponse');
      
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
            if (response.eTag !== gameState.mostRecentETag) {
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
