import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SystemsRoute extends Route {
  @service session;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }
}
