import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';


export default class ApplicationController extends Controller {
  @service router;
  @service me;

  get route() {
    return this.router.currentRouteName;
  }

  // @action
  // bgImage() {
  //   if (this.router.currentRouteName === 'index'){
  //     const banner = document.querySelector('.page-wrapper');
  //     window.addEventListener('DOMContentLoaded', () => {
  //       banner.classList.add('bg-image');
  //     });
  //   } else {
  //     const banner = document.querySelector('.page-wrapper');
  //     window.addEventListener('DOMContentLoaded', () => {
  //       banner.classList.remove('bg-image');
  //     });
  //   }
  // }
}
