import RESTAdapter from '@ember-data/adapter/rest';
import { inject as service } from '@ember/service';
import config from 'county-fe/config/environment';

export default class ApplicationAdapter extends RESTAdapter {
  @service session;

  namespace = 'api/v2';
  host = config.backend.BACKEND_API;

  get headers() {
    return {
      Authorization: `Bearer ${this.session?.data?.authenticated?.token}`,
    };
  }

  // handleResponse(status) {
  //   if (status === 401 && this.session.isAuthenticated) {
  //     this.session.invalidate();
  //   }
  //   return super.handleResponse(...arguments);
  // }
}
