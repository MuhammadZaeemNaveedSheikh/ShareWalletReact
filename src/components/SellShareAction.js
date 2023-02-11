import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import WalletService from '../services/wallet.service';

class SellShareAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      ticker: props.ticker || '',
      quantity: 1,
      error: null,
      processing: false
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleTickerChange = this.handleTickerChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleTickerChange(event) {
    this.setState({ ticker: event.target.value });
  }

  handleQuantityChange(event) {
    this.setState({ quantity: event.target.value });
  }

  handleClose() {
    this.setState({ open: false, ticker: this.props.ticker || '', quantity: 1, error: null, processing: false });
  }

  async handleSubmit() {
    if (!this.state.ticker) {
      this.setState({ error: 'You must enter the ticker of the share to sell.' });
      return;
    }

    if (!this.state.quantity) {
      this.setState({ error: 'You must enter the quantity of shares to sell.' });
      return;
    }

    this.setState({ error: null });

    try {
      this.setState({ processing: true });
      await WalletService.sell(this.state.ticker, this.state.quantity);
    } catch (error) {
      this.setState({ error });
      return;
    } finally {
      this.setState({ processing: false });
    }
    this.handleClose();
  }

  render() {
    let error;
    if (this.state.error) {
      error = (
        <div role="alert" className="u-error">
          {this.state.error}
        </div>
      );
    }

    let processing;
    if (this.state.processing) {
      processing = <CircularProgress size={20} />;
    }

    return (
      <div className="BuyShareAction">
        <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
          Sell
        </Button>

        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Sell shares</DialogTitle>
          <DialogContent>
            {error}

            <DialogContentText>Enter the ticker and the quantity of the share you wish to sell.</DialogContentText>

            <TextField
              autoFocus
              label="Ticker"
              value={this.state.ticker}
              onChange={this.handleTickerChange}
              type="text"
              margin="dense"
              fullWidth
              required
            />
            <TextField
              label="Quantity"
              value={this.state.quantity}
              onChange={this.handleQuantityChange}
              type="number"
              margin="dense"
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button className="u-cancel" onClick={this.handleClose}>
              Cancel
            </Button>
            {processing}
            <Button onClick={this.handleSubmit} color="primary" disabled={this.state.processing}>
              Sell share
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default SellShareAction;
