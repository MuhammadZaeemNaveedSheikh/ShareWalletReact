const APIError = require('../apiError');
const balance = require('../balance');
const share = require('../share');

class Holding {
  constructor(ticker) {
    this.quantity = 0;
    this.ticker = ticker;
  }

  async buy(qty) {
    const price = await share.getRealTimePrice(this.ticker);
    balance.withdraw(qty * price);
    this.quantity += qty;
  }

  async sell(qty) {
    if (qty > this.quantity) {
      throw new APIError('Not enough shares.', 401);
    }
    const price = await share.getRealTimePrice(this.ticker);
    this.quantity -= qty;
    balance.add(qty * price);
  }

  async encode() {
    this.company = this.company || (await share.getCompanyName(this.ticker));
    const price = await share.getRealTimePrice(this.ticker);
    return {
      ticker: this.ticker,
      company: this.company,
      quantity: this.quantity,
      shareValue: price,
      total: this.quantity * price
    };
  }

  isEmpty() {
    return !this.quantity;
  }
}

module.exports = Holding;
