import Route from '@ember/routing/route';

export default class ProjectsRoute extends Route {
  async model() {
    // return this.store.findAll('kpi');
    const response = await fetch('/api/v2/projects.json');
    return await response.json();
  }
}
