import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Wallet.css';
import { formatCurrency } from '../formatters';
import WalletService from '../services/wallet.service';
import BuyShareAction from './BuyShareAction';
import Holding from './Holding';

class Wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallet: null
    };

    this.observer = WalletService.subscribe(wallet => {
      this.setState({ wallet });
    });
    WalletService.init();
  }

  componentWillUnmount() {
    this.observer.unsubscribe();
  }

  render() {
    if (!this.state.wallet) {
      return (
        <div className="Wallet">
          <div className="Wallet-header">
            <CircularProgress />
          </div>
        </div>
      );
    }

    let holdings;
    if (this.state.wallet.holdings.length) {
      holdings = this.state.wallet.holdings.map(holding => <Holding holding={holding} key={holding.ticker} />);
    } else {
      holdings = <div className="Wallet-no-data">No holdings available in your wallet</div>;
    }

    return (
      <div className="Wallet">
        <div className="Wallet-header">
          <div className="Wallet-details">
            <h2 className="Wallet-title">Holdings</h2>
            <div className="Wallet-subtitle">Total net assets</div>
            <div className="Wallet-value">$ {formatCurrency(this.state.wallet.total)}</div>
          </div>

          <div className="Wallet-actions">
            <BuyShareAction />
          </div>
        </div>

        <div className="Wallet-holdings">{holdings}</div>
      </div>
    );
  }
}

export default Wallet;
