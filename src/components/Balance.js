import React, { Component } from 'react';

import BalanceService from '../services/balance.service';
import './Balance.css';
import { formatCurrency } from '../formatters';
import AddFundsAction from './AddFundsAction';
import WithdrawFundsAction from './WithdrawFundsAction';

class Balance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: null
    };

    this.observer = BalanceService.subscribe(amount => {
      this.setState({ amount });
    });
    BalanceService.init();
  }

  componentWillUnmount() {
    this.observer.unsubscribe();
  }

  render() {
    return (
      <div className="Balance">
        <div className="Balance-details">
          <h2 className="Balance-title">Account</h2>
          <div className="Balance-subtitle">Current balance</div>
          <div className="Balance-value">$ {formatCurrency(this.state.amount)}</div>
        </div>

        <div className="Balance-actions">
          <AddFundsAction />
          <WithdrawFundsAction />
        </div>
      </div>
    );
  }
}

export default Balance;
