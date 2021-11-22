import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service router;
  @service me;

  get route() {
    return this.router.currentRouteName;
  }
}
