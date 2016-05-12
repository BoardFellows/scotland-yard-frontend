(function() {
  angular.module('syServices')
    .factory('gameState', ['$log', '$window', '$timeout', '$routeParams','makeApiRequest', 'rerouteIfNeeded', gameState]);
  
  function gameState($log, $window, $timeout, $routeParams, makeApiRequest, rerouteIfNeeded) {
    const gameState               = {};
    
    // general required information
    gameState.user                = null;
    gameState.board               = angular.fromJson($window.localStorage.getItem('syGameBoard')) ? angular.fromJson($window.localStorage.getItem('syGameBoard')) : null;
    gameState.nodeList            = (gameState.board) ? Object.keys(gameState.board) : null;
    gameState.edgeTypes           = ['taxi', 'bus', 'underground', 'river'];
    
    // game management
    gameState.gameId              = $routeParams.gameId;
    gameState.game                = null;
    
    // turn management
    gameState.turns               = [];
    gameState.turnsUntilMrXReveal = null;
    gameState.mostRecentETag      = null;
    
    // user/player management
    gameState.userType            = null;
    gameState.mrxVisible          = false;
    gameState.usersTurn           = false;
    gameState.otherUser           = null;
    gameState.players             = ['mrx', 'det1', 'det2', 'det3', 'det4', 'det5'];
    gameState.playerToMove        = 'mrx';
    
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
    function createGame(gameCreatorIsMrX, otherPlayer, cb) {
      $log.info('gameState createGame');
      
      // TODO: figure out what data needs to be included here
      let newGameObj = { gameCreatorIsMrX, otherPlayer };
      
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
    function initialize() {
      $log.info('gameState initialize');
      let loadBoard = new Promise((resolve, reject) => {
        if (gameState.board) {
          resolve(true);
        } else {
          gameState.loadBoard((err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        }
      });
      let loadGame = new Promise((resolve, reject) => {
        if (gameState.game) {
          resolve(gameState.game);
        } else {
          gameState.loadGame(gameState.gameId, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          });
        }
      });
      return Promise.all([loadBoard, loadGame]);
    }
    
    
    /////////////////////////////////////
    // TAKES RESPONSE FROM SERVER AND INITIALIZES VARIABLES
    function buildInitGameState(gameData) {
      $log.info('gameState buildInitGameState');
      gameState.game   = gameData;
      gameState.rounds = gameData.rounds;
      
    }
    
    
    /////////////////////////////////////
    // BRING A GAME IN FROM THE DATABASE
    function loadGame(gameId, cb) {
      $log.info('gameState loadGame');
      if (!gameState.game) {
        makeApiRequest('GET', `games/${gameState.gameId}/`, (err, response) => {
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
                  // $window.sessionStorage.setItem('authToken', angular.toJson(null));
                  // $window.sessionStorage.setItem('user', angular.toJson(null));
                  // rerouteIfNeeded();
                }
              } else {
                alreadyTried++;
                tryLoadingBoard();
              }
            } else {
              gameState.board     = response;
              gameState.nodeList  = Object.keys(gameState.board);
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
    // BUILD THE BOARD FOR THE CURRENT TURN BASED ON A SERVER RESPONSE
    function buildBoardThisTurn(response) {
      $log.info('gameState buildBoardThisTurn');
      
    }
    
    /////////////////////////////////////
    // CHECK IF A MOVE IS VALID
    function checkMove(attemptedMove) {
      $log.info('gameState checkMove');
      
      
    }
    
    /////////////////////////////////////
    // PUSH THE MOVE THE DATABASE
    function makeMove(data , cb) {
      $log.info('gameState makeMove');
      makeApiRequest('PUT', `games/${gameState.gameId}/`, (err, response) => {
        if (err) {
          $log.error('FAILURE TO PUT A NEW GAME MOVE.');
          cb && cb(err);
        } else {
          $log.log(response);
          // let lastRound = response.rounds[response.rounds.length - 1];
          handleDbResponse(response);
          cb && cb(null, response);
        }
      }, data);  
    }
    
    
    /////////////////////////////////////
    // RETURNS THE EDGES THAT NEED TO BE HIGHLIGHTED
    function getMovesFromNode(nodeId) {
      $log.info('gameState getMovesFromNode');
      
    }
    
    /////////////////////////////////////
    // HANDLES THE RESPONSE FROM THE DATABASE IN RESPONSE TO A MOVE
    function handleDbResponse(response) {
      $log.info('gameState handleDbResponse');
      gameState.rounds        = response.rounds;
      gameState.playerToMove  = gameState.getNextPlayerToMove();
    }
    
    
    /////////////////////////////////////
    // FIGURE OUT WHICH PLAYER GETS TO MOVE NEXT
    function getNextPlayerToMove() {
      $log.info('gameState getNextPlayerToMove');
      let nextPlayer  = null;
      let lastRound   = gameState.rounds[gameState.rounds.length -1];
      for (var i = 0; i < gameState.players.length; i++) {
        if (lastRound[gameState.players[i]] !== null) {
          nextPlayer = gameState.players[i];
          break;
        }
      }
      return nextPlayer;  
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
