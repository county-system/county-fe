import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AdminEditRoute extends Route {
  @service session;
  @service me;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  model(params) {
    return this.store.find('user', params.id);
  }
}
