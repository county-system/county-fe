import Route from '@ember/routing/route';

export default class AdminIndexRoute extends Route {
  async model() {
    // return this.store.findAll('users');
    const response = await fetch('/api/v2/admin.json');
    return await response.json();
  }
}
