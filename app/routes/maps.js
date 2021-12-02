import Route from '@ember/routing/route';

export default class MapsRoute extends Route {
  async model() {
    // return this.store.findAll('maps');
    const response = await fetch('/api/v2/maps.json');
    return await response.json();
  }
}
