import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class IndexRoute extends Route {
  @inject me;
  @inject router;

  beforeModel() {
    if (this.me.user) {
      this.transitionTo('dashboard');
    }
  }
}
