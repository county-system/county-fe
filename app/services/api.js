import Service, { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class ApiService extends Service {
  api = 'http://127.0.0.1:8000/v1/';
  @service session;
  @service store;

  async getAuthToken() {
    const res = await fetch(
      this.store.adapterFor('user').urlForCreateRecord('user'),
      {
        method: 'GET',
        body: JSON.stringify({ user: fields }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }
    );
    if (res.ok) {
      return;
    }
    throw await res.json();
  }

  async getApiData(endpoint) {
    const res = await fetch(
      this.store.adapterFor('user').urlForCreateRecord('user'),
      {
        method: 'GET',
        body: JSON.stringify({ user: fields }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }
    );
    if (res.ok) {
      return;
    }
    throw await res.json();
  }
}
