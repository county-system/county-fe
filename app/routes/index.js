import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class IndexRoute extends Route {
  @inject me;
  @inject router;
  @inject session;

  async beforeModel(transition) {
    if (this.me.user) {
      this.transitionTo('dash');
    } else {
      this.session.requireAuthentication(transition, 'login');
    }
  }
}
