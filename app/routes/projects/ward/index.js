import Route from '@ember/routing/route';

export default class ProjectsWardIndexRoute extends Route {
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
