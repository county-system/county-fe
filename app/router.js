import EmberRouter from '@ember/routing/router';
import config from 'county-fe/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;

  constructor() {
    super(...arguments);

    this.on('routeDidChange', function () {
      window.scrollTo?.(0, 0);
    });
  }
}

Router.map(function () {
  this.route('users');
  this.route('dashboard');
  this.route('maps');
  this.route('kpi');
  this.route('login');
  this.route('dash');
  this.route('reports');
  this.route('downloads');
  this.route('not-found', { path: '/*path' });
  this.route('systems');
});
