import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class UsersRoute extends Route {
  @service session;

  async beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }
  async model() {
    // return this.store.findAll('users');
    const response = await fetch('/api/v2/users.json');
    return await response.json();
  }
}
