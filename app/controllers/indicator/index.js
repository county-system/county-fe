import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import { later } from '@ember/runloop';

export default class IndicatorIndexController extends Controller {
  @service store;
  @tracked modelData = this.model;
  @tracked dropdown = this.dropdownData();

  @tracked value;

  // constructor() {
  //   super(...arguments);
  //   this.chartType1 = 'bar';
  //   this.type = 'pie';
  // }

  @action
  dropdownData() {
    const dropdown = [];
    this.modelData.forEach((item) => {
      if (!dropdown.includes(item.department)) {
        dropdown.push(item.department);
      }
    });
    return dropdown;
  }
  @action
  dropdownValue(event) {
    this.value = event.target.value;
    this.value = event?.target?.value;
    if (this.value == 'all') {
      this.modelData = this.model;
    } else {
      this.modelData = this.model.filter((data) => {
        return data.department == this.value;
      });
    }
  }

  /**
   *
   * @param {*} format Document format
   * @returns a downloadable document
   */
  @action
  download(format) {
    console.log(format);
    return new RSVP.Promise(function (resolve) {
      later(resolve, 3000);
    });
  }
}
