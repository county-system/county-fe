import RESTAdapter from '@ember-data/adapter/rest';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default class ApplicationAdapter extends RESTAdapter {
  @service session;

  namespace = 'api/v1';
  host = config.backend.BACKEND_API;

  get headers() {
    console.log(this.session?.data?.authenticated?.access);
    return {
      Authorization: `Bearer ${this.session?.data?.authenticated?.access}`,
    };
  }
}
