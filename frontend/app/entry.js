////////////////////////////////////////////////
// REQUIRE ANGULAR
////////////////////////////////////////////////
require('angular');
require('angular-route');

////////////////////////////////////////////////
// REQUIRE CSS
////////////////////////////////////////////////
require(__dirname + '/css/base.css');
// require(__dirname + '/css/bootstrap.min.css');

////////////////////////////////////////////////
// REQUIRE ALL SERVICES
////////////////////////////////////////////////
require(__dirname + '/services/services.js');
require(__dirname + '/services/make-api-request.js');
require(__dirname + '/services/reroute-if-needed.js');
require(__dirname + '/services/game-state.js');

////////////////////////////////////////////////
// REQUIRE COMPONENTS
////////////////////////////////////////////////
require(__dirname + '/components/nav/controller.js');
require(__dirname + '/components/nav/directive.js');

require(__dirname + '/components/games/controller.js');
require(__dirname + '/components/games/directive.js');

require(__dirname + '/components/game/controller.js');

require(__dirname + '/components/login/controller.js');

////////////////////////////////////////////////
// REQUIRE MAIN APP
////////////////////////////////////////////////
require(__dirname + '/main/index.js');
