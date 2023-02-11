import React, { Component } from 'react';

import './Holding.css';
import { formatCurrency } from '../formatters';
import BuyShareAction from './BuyShareAction';
import SellShareAction from './SellShareAction';

class Holding extends Component {
  render() {
    return (
      <div className="Holding">
        <div className="Holding-section">
          <div className="Holding-label">Company</div>
          <div className="Holding-value">{this.props.holding.company}</div>
        </div>
        <div className="Holding-section">
          <div className="Holding-label">Ticker</div>
          <div className="Holding-value">{this.props.holding.ticker}</div>
        </div>
        <div className="Holding-section">
          <div className="Holding-label">Price per share</div>
          <div className="Holding-value">$ {formatCurrency(this.props.holding.shareValue)}</div>
        </div>
        <div className="Holding-section">
          <div className="Holding-label">Quantity</div>
          <div className="Holding-value">{this.props.holding.quantity}</div>
        </div>
        <div className="Holding-section">
          <div className="Holding-label">Total</div>
          <div className="Holding-value">$ {formatCurrency(this.props.holding.total)}</div>
        </div>
        <BuyShareAction ticker={this.props.holding.ticker} />
        <SellShareAction ticker={this.props.holding.ticker} />
      </div>
    );
  }
}

export default Holding;
