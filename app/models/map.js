import Model, { attr } from '@ember-data/model';

export default class MapsModel extends Model {

  @attr lat;
  @attr lng;
  @attr zoom;
  @attr department;
  @attr name_of_project;
  @attr gps_reading;
  @attr type;
  @attr project_cost;
  @attr ward;
  @attr site;
  @attr contracted_company;
  @attr project_start_date;
  @attr expected_date_of_completion;
  @attr payment_done_to_date;
  @attr outstanding_amount;
  @attr level_of_completion;
  @attr is_project_in_use;
  @attr remarks;
  @attr name;
  @attr active;
  @attr lat;
  @attr lng;

  get lastUpdateTime() {
    if (!this.createdAt) {
      return new Date();
    }

    return new Date(this.updatedAt).toLocaleString();
  }
}
