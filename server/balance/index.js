const APIError = require('../apiError');
const helper = require('../helper');

class Balance {
  constructor() {
    this.amount = 0;
  }

  add(value) {
    this.amount = helper.roundCurrency(this.amount + value);
  }

  withdraw(value) {
    if (value > this.amount) {
      throw new APIError('Insufficient funds.', 401);
    }
    this.amount = helper.roundCurrency(this.amount - value);
  }

  encode() {
    return {
      amount: this.amount
    };
  }

  validate(value) {
    const amount = helper.roundCurrency(value);
    if (amount < 0) {
      throw new APIError('Value must be positive.', 400);
    }
  }

  installRoutes(router) {
    router.get('/api/balance', cxt => {
      cxt.body = this.encode();
    });

    router.put('/api/balance/add', cxt => {
      // retrieve amount added
      const value = Number(cxt.request.body.value);

      this.validate(value);

      this.add(value);

      cxt.body = this.encode();
    });

    router.put('/api/balance/withdraw', cxt => {
      // retrieve amount withdrawn
      const value = Number(cxt.request.body.value);

      this.validate(value);

      this.withdraw(value);

      cxt.body = this.encode();
    });
  }
}

module.exports = new Balance();
