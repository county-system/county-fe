import Model, { attr } from '@ember-data/model';
import { capitalize } from '@ember/string';

export default class UserModel extends Model {
  @attr() username;
  @attr() email;
  @attr() password;
  @attr() firstName;
  @attr() lastName;
  @attr() lastSeen;
  @attr() updatedAt;
  @attr() inviteCode;
  @attr() createdAt;
  @attr() profileUri;
  @attr() metadata;
  @attr() name;
  @attr() emailVerified;
  @attr() location;
  @attr() contactNumber;
  @attr() department;
  @attr() gender;
  @attr() userRoles;

  get role() {
    if (!this.userRoles || !this.userRoles[0] || !this.userRoles[0].name) {
      return '';
    }

    return capitalize(this.userRoles[0].name);
  }

  get lastLoginTime() {
    if (!this.createdAt) {
      return new Date();
    }

    return new Date(this.updatedAt).toLocaleString();
  }

  get status() {
    return this.emailVerified ? 'Verified' : 'Unverified';
  }
}
