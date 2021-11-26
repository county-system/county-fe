import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class HeaderSideNavComponent extends Component {
  @action
  sideNavActions() {
    const showSidebar = document.querySelector('#show-sidebar');
    const pageWrapper = document.querySelector('.page-wrapper');

    showSidebar.addEventListener('click', () => {
      pageWrapper.classList.add('toggled');
    });

    var closeSidebar = document.querySelector('#close-sidebar');
    closeSidebar.addEventListener('click', () => {
      pageWrapper.classList.remove('toggled');
    });
  }
}
