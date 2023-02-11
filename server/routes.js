const balance = require('./balance');
const holdingRoute = require('./holding/route')
const share = require('./share');
const wallet = require('./wallet');

module.exports.install = router => {
    balance.installRoutes(router);
    holdingRoute.install(router);
    share.installRoutes(router);
    wallet.installRoutes(router);
};
