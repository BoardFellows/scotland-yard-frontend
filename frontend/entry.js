////////////////////////////////////////////////
// REQUIRE JS
////////////////////////////////////////////////
require('angular');
require('angular-route');

require(__dirname + '/app/services/services.js');
require(__dirname + '/app/services/make-api-request.js');
require(__dirname + '/app/services/reroute-if-needed.js');
require(__dirname + '/app/services/game-state.js');


require(__dirname + '/app/components/nav/controller.js');
require(__dirname + '/app/components/nav/directive.js');

require(__dirname + '/app/components/games/controller.js');
require(__dirname + '/app/components/games/directive.js');

require(__dirname + '/app/components/game/controller.js');
require(__dirname + '/app/components/game/manager/controller.js');
require(__dirname + '/app/components/game/board/controller.js');
require(__dirname + '/app/components/game/manager/directive.js');
require(__dirname + '/app/components/game/board/directive.js');

require(__dirname + '/app/components/login/controller.js');

require(__dirname + '/app/main/index.js');
