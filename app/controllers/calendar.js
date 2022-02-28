import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

import Calendar from 'tui-calendar'; /* ES6 */
import 'tui-calendar/dist/tui-calendar.css';
import moment from 'moment';

import Chance from 'chance';
// Instantiate Chance so it can be used
const chance = new Chance();

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

class CalendarData {
  constructor() {
    this.id = chance.guid();
    this.title = null;
    this.isAllDay = false;
    this.start = null;
    this.end = null;
    this.category = null;
    this.dueDateClass = null;
    this.color = null;
    this.bgColor = null;
    this.dragBgColor = null;
    this.borderColor = null;
    this.location = null;
    this.calendarId = null;
    this.createdAt = null;
    this.updatedAt = null;
  }
}
export default class CalendarController extends Controller {
  moment = moment;
  @service me;
  @service store;
  @service session;

  @tracked modelData = this.model;

  @tracked calendars = this.getCalendars;
  @tracked calendar;
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
  @tracked calendarEvents = this.getCalendarEvents();

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
    this.calendar.on('beforeCreateSchedule', (e) => {
      const calendar = {
        bgColor: '#56983F',
        borderColor: '#56983F',
        checked: true,
        color: '#000000',
        dragBgColor: '#56983F',
        id: '3',
        name: 'Post',
      };
      const schedule = {
        title: e.title,
        isAllDay: e.isAllDay,
        start: e.start,
        end: e.end,
        category: e.isAllDay ? 'allday' : 'time',
        dueDateClass: '',
        color: calendar.color,
        bgColor: calendar.bgColor,
        dragBgColor: calendar.bgColor,
        borderColor: calendar.borderColor,
        location: e.location,
      };
      if (calendar) {
        schedule.calendarId = calendar.id;
        schedule.color = calendar.color;
        schedule.bgColor = calendar.bgColor;
        schedule.borderColor = calendar.borderColor;
      }
      this.calendar.createSchedules([schedule]);
      console.log('schedule', schedule);
      this.store.createRecord('calendar', schedule);
      const model = this.store.createRecord('calendar', schedule);
      model.save();
    });
    this.setRenderRangeText();
  }

  @action
  getDataAction(target) {
    return target.dataset
      ? target.dataset.action
      : target.getAttribute('data-action');
  }
  @action
  onClickNavigation(e) {
    var action = this.getDataAction(e.target);
    switch (action) {
      case 'move-prev':
        this.calendar.prev();
        break;
      case 'move-next':
        this.calendar.next();
        break;
      case 'move-today':
        this.calendar.today();
        break;
      default:
        return;
    }
    this.setRenderRangeText();
    // setSchedules();
  }
  @action
  setRenderRangeText() {
    const renderRange = document.getElementById('renderRange');
    const options = this.calendar.getOptions();
    const viewName = this.calendar.getViewName();
    const html = [];
    if (viewName === 'day') {
      html.push(moment(this.calendar.getDate().getTime()).format('YYYY-MM-DD'));
    } else if (
      viewName === 'month' &&
      (!options.month.visibleWeeksCount || options.month.visibleWeeksCount > 4)
    ) {
      html.push(moment(this.calendar.getDate().getTime()).format('YYYY-MM'));
    } else {
      html.push(
        moment(this.calendar.getDateRangeStart().getTime()).format('YYYY-MM-DD')
      );
      html.push('-');
      html.push(
        moment(this.calendar.getDateRangeEnd().getTime()).format(' MM.DD')
      );
    }
    renderRange.innerHTML = html.join('');
  }
  @action
  calendarToggle(e) {
    const checked = e.target.checked;
    const calendarId = e.target.value;

    if (checked && calendarId === 'all') {
      this.calendars.forEach(function (calendar) {
        calendar.checked = true;
        this.calendar.toggleSchedules(calendarId, true, false);
      });
    } else if (!checked && calendarId === 'all') {
      this.calendars.forEach(function (calendar) {
        calendar.checked = false;
      });
      this.calendar.toggleSchedules(calendarId, false, false);
    } else if (calendarId) {
      const calendar = this.getCalendar(calendarId);
      calendar.checked = checked;
      calendar.bgColor = 'transparent';
      this.calendar.toggleSchedules(calendarId, !calendar.checked, false);
    }

    this.calendar.render(true);
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
        color: '#000000',
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
  createNewSchedule(event) {
    const useCreationPopup = true;
    const start = event.start ? new Date(event.start.getTime()) : new Date();
    const end = event.end
      ? new Date(event.end.getTime())
      : moment().add(1, 'hours').toDate();

    if (useCreationPopup) {
      this.calendar.openCreationPopup({
        start: start,
        end: end,
      });
    }
  }

  //   @action
  //   async createCalendar() {
  //     const response = await this.me.createCalendar(this.calendarInfo);
  //     this.calendarInfo = new CalendarInfo();
  //     this.calendars.push(response.data);
  //   }

  //   @action
  //   async updateCalendar() {
  //     const response = await this.me.updateCalendar(this.calendarInfo);
  //     this.calendarInfo = new CalendarInfo();
  //     this.calendars.push(response.data);
  //   }

  //   @action
  //   async deleteCalendar(id) {
  //     this.calendars = this.calendars.filter((calendar) => calendar.id !== id);
  //   }

  @action
  getCalendarEvents() {
    const allData = this.store
      .peekAll('calendar')
      .filter((event) => event.id)
      .map((event) => {
        const dataModel = new CalendarData();
        dataModel.id = event.id;
        dataModel.title = event.title;
        dataModel.isAllDay = event.isAllDay;
        dataModel.start = event.start;
        dataModel.end = event.end;
        dataModel.category = event.isAllDay ? 'allday' : 'time';
        dataModel.dueDateClass = '';
        dataModel.color = event.color;
        dataModel.bgColor = event.bgColor;
        dataModel.dragBgColor = event.bgColor;
        dataModel.borderColor = event.borderColor;
        dataModel.location = event.location;
        return dataModel;
      });
    return allData;
  }

  //   @action
  //   async createCalendarEvent(id) {
  //     const response = await this.me.createCalendarEvent(id, this.calendar);
  //     this.calendar = response.data;
  //   }

  //   @action
  //   async updateCalendarEvent(id) {
  //     const response = await this.me.updateCalendarEvent(id, this.calendar);
  //     this.calendar = response.data;
  //   }

  //   @action
  //   async deleteCalendarEvent(id) {
  //     const response = await this.me.deleteCalendarEvent(id);
  //     this.calendar = response.data;
  //   }

  //   @action
  //   async getCalendarEvent(id) {
  //     const response = await this.me.getCalendarEvent(id);
  //     this.calendar = response.data;
  //   }

  //   @action
  //   async getCalendarEventAttendees(id) {
  //     const response = await this.me.getCalendarEventAttendees(id);
  //     this.calendar = response.data;
  //   }

  //   @action
  //   async createCalendarEventAttendee(id) {
  //     const response = await this.me.createCalendarEventAttendee(
  //       id,
  //       this.calendar
  //     );
  //     this.calendar = response.data;
  //   }
}
