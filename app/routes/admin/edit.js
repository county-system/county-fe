import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AdminEditRoute extends Route {
  @service session;
  @service me;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async model() {
    return await this.store.find('user', this.me.id);
  }
}
