import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @action
  bgImage() {
    const banner = document.querySelector('.page-wrapper');
    window.addEventListener('DOMContentLoaded', () => {
      banner.classList.add('bg-image');
    });
  }
}
