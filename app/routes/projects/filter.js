import Route from '@ember/routing/route';

export default class ProjectsFilterRoute extends Route {
    async beforeModel(transition) {
        this.session.requireAuthentication(transition, 'login');
      }
}
