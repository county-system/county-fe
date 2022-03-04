import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class AvatarAvatarComponent extends Component {
  @service me;
  @service session;
  @service model;


    get avatar() {
        return this.me.profileURI;
        }
}
