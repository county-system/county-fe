import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import LoginValidations from '../../validations/login';

class UserForm {
  @tracked email;
  @tracked firstname;
  @tracked lastname;
  @tracked password;
}

export default class AdminIndexController extends Controller {
  LoginValidations = LoginValidations;
  @tracked modelData = this.model;
  @tracked modal1 = false;
  @tracked totalUsers = 100;
  @tracked searchLoading = false;
  @tracked searchQuery = '';

  get allUsers() {
    return this.model.filter((user) => user.id);
  }

  get users() {
    return this.modelData.filter((user) => {
      return user.email.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  constructor() {
    super(...arguments);
    this.userLoginForm = new UserForm();
  }

  @action
  async handleChange(evt) {
    this.searchQuery = evt;
  }

  @action
  createUser(model) {
    let fields = {
      username: model.username,
      email: model.email,
      contactNumber: model.contactNumber,
      password: model.password,
      inviteCode: model.inviteCode,
    };
    console.log(fields);
    alert('Modal submitted!');
  }
}
