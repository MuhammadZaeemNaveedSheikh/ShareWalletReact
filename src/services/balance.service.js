import { Subject } from 'rxjs';

class Balance extends Subject {
  constructor() {
    super();
    this.initPromise = null;
  }

  init() {
    if (!this.initPromise) {
      this.initPromise = this.refresh();
    }

    return this.initPromise;
  }

  async add(value) {
    const response = await fetch('/api/balance/add', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value })
    });
    return this.handleResponse(response);
  }

  async withdraw(value) {
    const response = await fetch('/api/balance/withdraw', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value })
    });
    return this.handleResponse(response);
  }

  async refresh() {
    const response = await fetch('/api/balance');
    return this.handleResponse(response);
  }

  async handleResponse(response) {
    let data;
    try {
      data = await response.json();
      if (data.error) {
        throw data.error;
      }
    } catch (error) {
      throw error || 'An unknown error has occured';
    }
    this.next(data.amount);
  }
}

const singleton = new Balance();
export default singleton;
