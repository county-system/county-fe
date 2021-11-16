import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class KpiRoute extends Route {

  async model() {
    // return this.store.findAll('kpi');
    const response = await fetch('/api/v2/kpi.json');
    const kpi = await response.json();
    return kpi;
  }
}
