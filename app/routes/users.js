import Route from '@ember/routing/route';

export default class UsersRoute extends Route {
  async model() {
    // return this.store.findAll('users');
    const response = await fetch('/api/v2/users.json');
    return await response.json();
  }
}
