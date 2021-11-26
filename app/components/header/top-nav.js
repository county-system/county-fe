import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HeaderTopNavComponent extends Component {
  @service session;
  @service currentUser;

  @tracked isSidebarPinned = false;
  @tracked isSidebarToggeled = false;

  @action
  toggleSidebar() {
    this.isSidebarToggeled = !this.isSidebarToggeled;
  }
  @action
  toggleSidebarPin() {
    this.isSidebarPinned = !this.isSidebarPinned;
  }
}
