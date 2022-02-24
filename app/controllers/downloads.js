import Controller from '@ember/controller';
import { action } from '@ember/object';
import RSVP from 'rsvp';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DownloadsController extends Controller {
  @service me;

  @tracked email = this.me.user.email;
  @tracked name = this.me.user.name;

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

  @action
  async submit(model) {
    try {
      await model.save();
      this.flashMessages.success('Your message has been sent!');
    } catch (e) {
      this.flashMessages.danger('There was an error sending your message!');
    }
  }
}
