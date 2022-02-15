import Route from '@ember/routing/route';

export default class ProjectsSummaryRoute extends Route {
    async beforeModel(transition) {
        this.session.requireAuthentication(transition, 'login');
      }
}
