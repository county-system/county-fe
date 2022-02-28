import Model, { attr } from '@ember-data/model';

export default class CalendarModel extends Model {
  @attr title;
  @attr isAllDay;
  @attr start;
  @attr end;
  @attr category;
  @attr dueDateClass;
  @attr color;
  @attr bgColor;
  @attr dragBgColor;
  @attr borderColor;
  @attr location;
  @attr calendarId;
}
