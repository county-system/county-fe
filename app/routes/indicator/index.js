import Route from '@ember/routing/route';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

export default class IndicatorIndexRoute extends Route {
  @service session;
  @service me;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async model() {
    // return this.store.findAll('kpi');
    const response = await fetch('/api/v2/kpi.json');
    return await response.json();
  }
}
