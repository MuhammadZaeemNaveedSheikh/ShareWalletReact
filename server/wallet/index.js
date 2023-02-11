const helper = require('../helper');

class Wallet {
  constructor() {
    this.holdings = new Map();
  }

  async encode() {
    const holdings = await Promise.all(Array.from(this.holdings.values()).map(holding => holding.encode()));
    const total = holdings.reduce((total, holding) => helper.roundCurrency(holding.total + total), 0);
    return {
      count: this.holdings.size,
      holdings: holdings,
      total: total
    };
  }

  installRoutes(router) {
    router.get('/api/wallet', async cxt => {
      cxt.body = await this.encode();
    });
  }
}

module.exports = new Wallet();
