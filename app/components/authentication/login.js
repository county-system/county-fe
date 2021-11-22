import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import LoginValidations from '../../validations/login';

export default class AuthenticationLoginComponent extends Component {
  LoginValidations = LoginValidations;

  @inject me;
  @inject session;

  @tracked loading = false;

  @action
  login(model) {
    this.loading = true;
    this.me
      .authenticate(model.get('username'), model.get('password'))
      .then(() => {
        this.args.authenticationSuccessful();
      })
      .catch(() => {
        this.loading = false;
      });
  }
  // @action
  // async authenticateWithOAuth2(model) {
  //   try {
  //     // let { identification, password } = this;
  //     await this.session.authenticate(
  //       'authenticator:oauth2',
  //       model.get('username'),
  //       model.get('password')
  //     );

  //     if (this.rememberMe) {
  //       this.session.set('store.cookieExpirationTime', 60 * 60 * 24 * 14);
  //     }
  //   } catch (response) {
  //     let responseBody = await response.clone().json();
  //     set('errorMessage', responseBody);
  //   }
  // }
}
