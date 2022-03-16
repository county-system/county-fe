import Model, { attr } from '@ember-data/model';

export default class KpiModel extends Model {
  @attr department;
  @attr indicators;
  @attr unit;
  @attr baseline_year;
  @attr baseline_value;
  @attr financial_year;
  @attr actual_achievement;

  @attr('date') start_date;
  @attr('date') end_date;
  @attr('date') completion_date;

  get financial_year_data() {
    return this.financial_year.year;
  }

  get financial_year_number() {
    return this.financial_year.number;
  }
}
