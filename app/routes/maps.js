import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class MapsRoute extends Route {
  @service session;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }
  async model() {
    // return this.store.findAll('maps');
    const response = await fetch('/api/v2/maps.json');
    return await response.json();
  }
}
