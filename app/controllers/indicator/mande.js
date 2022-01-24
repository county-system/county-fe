import Controller from '@ember/controller';
import { action } from '@ember/object';
import RSVP from 'rsvp';
import { later } from '@ember/runloop';

export default class IndicatorMandeController extends Controller {
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
