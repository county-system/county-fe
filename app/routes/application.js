import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service session;
  @service me;
  @service router;

  beforeModel() {
    return this._loadMe();
  }
  _loadMe() {
    return this.me.load();
  }
}
