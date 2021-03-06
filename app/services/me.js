import Service, { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class MeService extends Service {
  @service session;
  @service store;
  @tracked user;

  get isAuthenticated() {
    return this.session.isAuthenticated;
  }

  async load() {
    const authenticator = getOwner(this).lookup('authenticator:jwt');
    const session = this.session.data.authenticated;

    let tokenData;
    if (session && session.token) {
      tokenData = authenticator.getTokenData(session.token);
      try {
        this.user = await this.store.findRecord('user', tokenData.data.id);
      } catch (e) {
        return this.session.invalidate();
      }
    }

    return Promise.resolve();
  }

  async register(fields) {
    const res = await fetch(
      this.store.adapterFor('user').urlForCreateRecord('user'),
      {
        method: 'POST',
        body: JSON.stringify({ user: fields }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }
    );
    if (res.ok) {
      return;
    }
    throw await res.json();
  }

  authenticate(username, password) {
    let credentials = { username, password };
    return this.session
      .authenticate('authenticator:jwt', credentials)
      .then(() => {
        return this.load();
      });
  }

  logout() {
    return this.session.invalidate();
  }

  get name() {
    if (!this.user) {
      return '';
    }
    if (this.user.name) {
      return this.user.name;
    }

    if (!this.user.metadata) {
      return this.user.username;
    }
    if (this.user.metadata.firstName && this.user.metadata.lastName) {
      return `${this.user.metadata.firstName} ${this.user.metadata.lastName}`;
    } else if (this.user.metadata.firstName && !this.user.metadata.lastName) {
      return this.user.metadata.firstName;
    } else if (!this.user.metadata.firstName && this.user.metadata.lastName) {
      return this.user.metadata.lastName;
    } else {
      return this.user.username;
    }
  }

  get isEmailVerified() {
    if (this.user) {
      return this.user.emailVerified;
    }

    return null;
  }

  get id() {
    if (this.user) {
      return this.user.id;
    }

    return null;
  }

  get role() {
    if (this.user) {
      return this.user.role;
    }
    return null;
  }
  get isNotBasic() {
    if (this.user && this.user.role) {
      return this.user.role.toLowerCase() != 'basic';
    }
    return false;
  }

  get isAdmin() {
    if (this.user && this.user.role) {
      return this.user.role.toLowerCase() === 'admin';
    }
    return false;
  }
}
