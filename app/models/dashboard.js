import Model, { attr } from '@ember-data/model';

export default class DashboardModel extends Model {
  @attr data;
  @attr title;
  @attr label;
}
