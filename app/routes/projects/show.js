import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProjectsShowRoute extends Route {
  @service session;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }
  //   async model(params) {
  //   return this.store.findRecord('projects', params.ward_id);
  //   }
  async model(params) {
    const response = await fetch(`/api/v2/projects/${params.ward_id}.json`);
    return await response.json();
  }
}
