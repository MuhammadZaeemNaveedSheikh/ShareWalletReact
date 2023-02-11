const APIError = require('../apiError');
const wallet = require('../wallet');
const Holding = require('../holding');

module.exports.install = router => {
  router.put('/api/share/buy', async cxt => {
    // retrieve quantity added
    const quantity = Number(cxt.request.body.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      throw new APIError('Quantity must be a positive number.', 400);
    }
    // TODO: validation of ticker
    const ticker = cxt.request.body.ticker.toUpperCase();

    let holding = wallet.holdings.get(ticker) || new Holding(ticker);
    await holding.buy(quantity);
    console.log('new holding: ', holding);
    wallet.holdings.set(ticker, holding);

    cxt.body = await wallet.encode();
  });

  router.put('/api/share/sell', async cxt => {
    // retrieve quantity added
    const quantity = Number(cxt.request.body.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      throw new APIError('Quantity must be a positive number.', 400);
    }
    // TODO: validation of ticker
    const ticker = cxt.request.body.ticker.toUpperCase();

    let holding = wallet.holdings.get(ticker);
    if (!holding) {
      throw new APIError('Holding not found in the wallet.', 400);
    }
    await holding.sell(quantity);
    console.log('new holding: ', holding);
    if (holding.isEmpty()) {
      wallet.holdings.delete(ticker);
    }
    cxt.body = await wallet.encode();
  });
};
