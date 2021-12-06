import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
import JWT from 'ember-simple-auth-token/authenticators/jwt';

export default class MeService extends Service {
  @service session;
  @service store;
  @tracked user;

  get isAuthenticated() {
    return this.session.isAuthenticated;
  }

  async load() {
    // const authenticator = getOwner(this).lookup('authenticator:jwt');
    const session = this.session.data.authenticated;

    if (this.session.isAuthenticated) {
      // const tokenData = authenticator.getTokenData(session.access);
      const tokenData = this.getUserIdFromToken(session.access);
      this.user = await this.store.queryRecord('user', tokenData);
      console.log(this.user);
      // try {
      //   this.user = await this.store.findRecord('user', tokenData.user_id);
      // } catch (e) {
      //   return this.session.invalidate();
      // }
    }
    return Promise.resolve();
  }

  getUserIdFromToken(token) {
    const jwt = new JWT();
    const tokenData = jwt.getTokenData(token);
    return tokenData['user_id'];
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

  // async authenticate(username, password) {
  //   let credentials = { username, password };
  //   const res = await fetch('http://127.0.0.1:8000/api/token/', {
  //     method: 'POST',
  //     body: JSON.stringify(credentials),
  //     headers: { 'Content-type': 'application/json' },
  //   });
  //   const { refresh, acess } = await res.json();
  //   console.log(refresh, acess);
  //   if (res.ok) {
  //     return;
  //   }
  //   throw await res.json();
  // }

  authenticate(username, password) {
    let credentials = { username, password };
    return this.session
      .authenticate('authenticator:token', credentials)
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
}
