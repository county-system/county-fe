import Model, { attr } from '@ember-data/model';

export default class KpiModel extends Model {
  @attr project_name;
  @attr implementing_entity;
  @attr sub_county;
  @attr ward;
  @attr project_status;
  @attr project_cost;

  @attr('date') start_date;
  @attr('date') end_date;
  @attr('date') completion_date;
}
