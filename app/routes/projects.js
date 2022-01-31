import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProjectsRoute extends Route {
  @service session;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }
  async model() {
    // return this.store.findAll('kpi');
    const response = await fetch('/api/v2/projects.json');
    return await response.json();
  }
}
