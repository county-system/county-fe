import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AdminIndexRoute extends Route {
  @service session;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }
  async model() {
    return this.store.findAll('user');
    // const response = await fetch('/api/v2/admin.json');
    // return await response.json();
  }
}
