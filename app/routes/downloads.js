import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DownloadsRoute extends Route {
  @service me;
  @service session;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }
}
