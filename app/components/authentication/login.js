import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import LoginValidations from '../../validations/login';

export default class AuthenticationLoginComponent extends Component {
  LoginValidations = LoginValidations;

  @service me;
  @service session;
  @service flashMessages;

  @tracked loading = false;
  @tracked loginErrors;

  @action
  flashMessage(message) {
    // let message = (concat "Clicked: " location.lat ", " location.lng)
    this.flashMessages.errors(message);
  }

  @action
  login(model) {
    this.loading = true;
    this.me
      .authenticate(model.get('username'), model.get('password'))
      .then(() => {
        this.args.authenticationSuccessful();
      })
      .catch((err) => {
        this.loading = false;
        if (err) {
          const constraint = 'errors';
          const error_message = 'Wrong username or password';
          // model.addError(constraint, error_message);
          this.loginErrors = {
            key: constraint,
            error_message: error_message,
          };
        }
      });
  }
}
