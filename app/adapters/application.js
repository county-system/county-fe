import RESTAdapter from '@ember-data/adapter/rest';
import { inject as service } from '@ember/service';
// import config from '../config/environment';

export default class ApplicationAdapter extends RESTAdapter {
  @service session;

  namespace = 'api/v2';
  // host = config.backend.BACKEND_API;
  host = 'http://localhost:4200';

  get headers() {
    console.log(this.session?.data?.authenticated?.access);
    return {
      Authorization: `Bearer ${this.session?.data?.authenticated?.access}`,
    };
  }
}
