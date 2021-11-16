import RESTAdapter from '@ember-data/adapter/rest';

export default class ApplicationAdapter extends RESTAdapter {
  namespace = 'api/v2';
  //   get headers() {
  //     return {
  //       Authorization: `Bearer ${this.session?.data?.authenticated?.token}`,
  //     };
  //   }
}
