import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DashRoute extends Route {
  @service me;
  @service session;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async model() {
    // return await this.store.findAll('kpi', { reload: true });
    const response = await fetch('/api/v2/kpi.json');
    return await response.json();
  }
}
