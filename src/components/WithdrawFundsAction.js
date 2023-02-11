import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import BalanceService from '../services/balance.service';

class WithdrawFundsAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      value: 0,
      error: null
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleClose() {
    this.setState({ open: false, value: 0, error: null });
  }

  async handleSubmit() {
    if (!this.state.value) {
      this.setState({ error: 'You must enter the amount to transfer.' });
      return;
    }

    this.setState({ error: null });

    try {
      await BalanceService.withdraw(Number(this.state.value));
    } catch (error) {
      this.setState({ error });
      return;
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

    return (
      <div className="WithdrawFundsAction">
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Withdraw funds
        </Button>

        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Withdraw funds from your wallet</DialogTitle>
          <DialogContent>
            {error}

            <DialogContentText>
              Enter the amount you wish to transfer from your wallet's balance to your nominated bank account.
            </DialogContentText>

            <TextField autoFocus label="Amount to transfer" onChange={this.handleChange} type="number" margin="dense" fullWidth required />
          </DialogContent>
          <DialogActions>
            <Button className="u-cancel" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Withdraw funds
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default WithdrawFundsAction;
