import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProjectsWardIndexRoute extends Route {
  @service session;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }
  async model(params) {
    const response = await fetch(
      `/api/v2/projects/ward/${params.ward_name}.json`
    );
    return await response.json();
  }
}
