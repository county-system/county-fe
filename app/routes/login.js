import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class LoginRoute extends Route {
  @inject me;

  async beforeModel() {
    if (this.me.user) {
      this.transitionTo('dash');
    }
  }

  model() {
    return this.store.createRecord('user');
  }
}
