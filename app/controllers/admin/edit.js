import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AdminEditController extends Controller {
  @action
  submit(model) {
    model.model.save().then(() => {
      this.transitionToRoute('admin');
    });
  }
}
