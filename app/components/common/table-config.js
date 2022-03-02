import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CommonTableConfigComponent extends Component {
  @service store;
  @tracked model = this.model;

  get model() {
    return this.store.findRecord('kpi', 1);
  }
}
