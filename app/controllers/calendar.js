import Controller from '@ember/controller';
import Calendar from 'tui-calendar'; /* ES6 */
import 'tui-calendar/dist/tui-calendar.css';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';
import moment from 'moment';
import { tracked } from '@glimmer/tracking';

class CalendarInfo {
  constructor() {
    this.id = null;
    this.name = null;
    this.checked = true;
    this.color = null;
    this.bgColor = null;
    this.borderColor = null;
    this.dragBgColor = null;
    this.customStyle = null;
    this.isVisible = true;
    this.isReadOnly = false;
    this.isFocused = false;
    this.isPending = false;
  }
}
export default class CalendarController extends Controller {
  moment = moment;
  @service me;
  @service session;

  @tracked calendars = this.getCalendars;
  @tracked calendar = null;
  @tracked calendarId = null;
  @tracked calendarName = null;
  @tracked calendarColor = null;
  @tracked calendarBgColor = null;
  @tracked calendarBorderColor = null;
  @tracked calendarDragBgColor = null;
  @tracked calendarCustomStyle = null;
  @tracked calendarIsVisible = true;
  @tracked calendarIsReadOnly = false;
  @tracked calendarIsFocused = false;
  @tracked calendarIsPending = false;
  @tracked calendarIsNew = false;
  @tracked calendarIsEdit = false;
  @tracked calendarInfo = new CalendarInfo();
  @tracked calendarEvents = this.getCalendarEvents;

  @action
  getTimeTemplate(schedule, isAllDay) {
    var html = [];
    var start = moment(schedule.start.toUTCString());
    if (!isAllDay) {
      html.push('<strong>' + start.format('HH:mm') + '</strong> ');
    }
    if (schedule.isPrivate) {
      html.push('<span class="calendar-font-icon ic-lock-b"></span>');
      html.push(' Private');
    } else {
      if (schedule.isReadOnly) {
        html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
      } else if (schedule.recurrenceRule) {
        html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
      } else if (schedule.attendees.length) {
        html.push('<span class="calendar-font-icon ic-user-b"></span>');
      } else if (schedule.location) {
        html.push('<span class="calendar-font-icon ic-location-b"></span>');
      }
      html.push(' ' + schedule.title);
    }
    return html.join('');
  }

  @action
  calendarInit(e) {
    this.calendar = e;
    this.calendar = new Calendar('#calendar', {
      defaultView: 'month',
      useCreationPopup: true,
      useDetailPopup: true,
      calendars: this.calendars,
      taskView: true,
      template: {
        milestone: function (schedule) {
          return `<span class="tui-full-calendar-milestone-dot" style="background-color:${schedule.bgColor}"></span>`;
        },
        task: function (schedule) {
          return `<span class="tui-full-calendar-task-dot" style="background-color:${schedule.bgColor}"></span>`;
        },
      },
      scheduleView: {
        start: '09:00',
        end: '18:00',
        allDayEnd: '23:59',
        allDayStart: '00:00',
      },
      timezones: [
        {
          timezoneOffset: -540,
          displayLabel: 'Alaska',
          tooltip: 'Alaska Time',
        },
        {
          timezoneOffset: -480,
          displayLabel: 'Hawaii',
          tooltip: 'Hawaii Time',
        },
      ],
      useSchedulePopup: true,
      useTimezones: true,
    });
    this.calendar.createSchedules(this.calendarEvents);
  }

  @action
  calendarToggle(e) {
    const checked = e.target.checked;
    const calendarId = e.target.value;

    // var viewAll = document.querySelector('.sidebar-calendars-item input');

    if (checked && calendarId === 'all') {
      this.calendars.forEach(function (calendar) {
        calendar.checked = true;
      });
      //   viewAll.checked = true;
    } else if (calendarId) {
      const calendar = this.getCalendar(calendarId);
      calendar.checked = checked;
      calendar.bgColor = 'transparent';
      this.calendar.toggleSchedules(calendarId, !calendar.checked, false);
    }

    this.calendar.render(true);

    //     let allCheckedCalendars = true;
    //     // const calendar = this.calendars.find(
    //     //   (calendar) => calendar.id === calendarId
    //     // );
    //     const calendarElements = Array.prototype.slice.call(
    //       document.querySelectorAll('#calendarList input')
    //     );

    //     this.calendar.setOptions({
    //       calendars: this.calendars,
    //     });
    //     this.calendars.checked = checked;

    //     if (calendarId === 'all') {
    //       allCheckedCalendars = checked;

    //       calendarElements.forEach(function (input) {
    //         var span = input.parentNode;
    //         input.checked = checked;
    //         span.style.backgroundColor = checked
    //           ? span.style.borderColor
    //           : 'transparent';
    //       });

    //       this.calendars.forEach(function (calendar) {
    //         calendar.checked = checked;
    //       });
    //     } else {
    //       this.findCalendar(calendarId).checked = checked;

    //       allCheckedCalendars = calendarElements.every(function (input) {
    //         return input.checked;
    //       });

    //       if (allCheckedCalendars) {
    //         viewAll.checked = true;
    //       } else {
    //         viewAll.checked = false;
    //       }
    //     }
  }

  get getCalendars() {
    // const response = await this.me.getCalendars();
    // this.calendars = response.data;
    const calendars = [
      {
        bgColor: '#56983F',
        borderColor: '#56983F',
        checked: true,
        color: '#000000',
        dragBgColor: '#56983F',
        id: '1',
        name: 'Post',
      },
      {
        bgColor: '#e06000',
        borderColor: '#e06000',
        checked: true,
        color: '#e06000',
        dragBgColor: '#e06000',
        id: '2',
        name: 'Events',
      },
      {
        bgColor: '#803f98',
        borderColor: '#803f98',
        checked: true,
        color: '#803f98',
        dragBgColor: '#803f98',
        id: '3',
        name: 'Offer',
      },
    ];
    return calendars;
  }
  @action
  async getCalendar(id) {
    // const response = await this.me.getCalendar(id);
    // this.calendarInfo = response.data;
    let found;
    this.calendars.forEach(function (calendar) {
      if (calendar.id === id) {
        found = calendar;
      }
    });

    return found || this.calendars[0];
  }

  @action
  async createCalendar() {
    const response = await this.me.createCalendar(this.calendarInfo);
    this.calendarInfo = new CalendarInfo();
    this.calendars.push(response.data);
  }

  @action
  async updateCalendar() {
    const response = await this.me.updateCalendar(this.calendarInfo);
    this.calendarInfo = new CalendarInfo();
    this.calendars.push(response.data);
  }

  @action
  async deleteCalendar(id) {
    // const response = await this.me.deleteCalendar(id);
    this.calendars = this.calendars.filter((calendar) => calendar.id !== id);
  }

  get getCalendarEvents() {
    // const response = await this.me.getCalendarEvents();
    // this.calendar = response.data;
    const events = [
      {
        id: '1',
        calendarId: '1',
        title: 'schedule',
        category: 'time',
        dueDateClass: '',
        start: '2022-02-22T22:30:00+09:00',
        end: '2022-02-24T02:30:00+09:00',
      },
      {
        id: '2',
        calendarId: '1',
        title: 'second schedule',
        category: 'time',
        dueDateClass: '',
        start: '2022-02-24T17:30:00+09:00',
        end: '2022-02-26T17:30:00+09:00',
        isReadOnly: true,
      },
    ];
    return events;
  }

  @action
  async createCalendarEvent(id) {
    const response = await this.me.createCalendarEvent(id, this.calendar);
    this.calendar = response.data;
  }

  @action
  async updateCalendarEvent(id) {
    const response = await this.me.updateCalendarEvent(id, this.calendar);
    this.calendar = response.data;
  }

  @action
  async deleteCalendarEvent(id) {
    const response = await this.me.deleteCalendarEvent(id);
    this.calendar = response.data;
  }

  @action
  async getCalendarEvent(id) {
    const response = await this.me.getCalendarEvent(id);
    this.calendar = response.data;
  }

  @action
  async getCalendarEventAttendees(id) {
    const response = await this.me.getCalendarEventAttendees(id);
    this.calendar = response.data;
  }

  @action
  async createCalendarEventAttendee(id) {
    const response = await this.me.createCalendarEventAttendee(
      id,
      this.calendar
    );
    this.calendar = response.data;
  }
}
