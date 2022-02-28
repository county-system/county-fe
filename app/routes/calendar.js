import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class CalendarRoute extends Route {
  @inject me;
  @inject router;
  @inject session;
  @inject store;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async model() {
    return await this.store.findAll('calendar', { reload: true });
  }
}
