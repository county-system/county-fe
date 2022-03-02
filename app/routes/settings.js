import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class SettingsRoute extends Route {
  @service session;
  @service me;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async model() {
    return this.store.find('user', this.me.id);
  }
}
