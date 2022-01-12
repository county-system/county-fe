import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import RSVP from 'rsvp';
import { later } from '@ember/runloop';

export default class ProjectsWardIndexController extends Controller {
  @tracked modelData = this.model;

  /**
   *
   * @param {*} format Document format
   * @returns a downloadable document
   */
  @action
  download(format) {
    this.model.download(format);
    console.log(format);
    return new RSVP.Promise(function (resolve) {
      later(resolve, 3000);
    });
  }
}
