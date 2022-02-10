import Controller from '@ember/controller';
import { set } from '@ember/object';
import colorLib from '@kurkle/color';
import { tracked } from '@glimmer/tracking';


export default class DashboardController extends Controller {
  @tracked totalReports = 0;
  @tracked totalUsers = 0;
  @tracked pendingReports = 0;
  @tracked awaitingApproval = 0;
  @tracked totalApproved = 0;
  @tracked totalRejected = 0;
  @tracked type = 'line';

  $primary = '#5A8DEE';
  $success = '#39DA8A';
  $danger = '#FF5B5C';
  $warning = '#FDAC41';
  $info = '#00CFDD';
  $label_color = '#475F7B';
  grid_line_color = '#dae1e7';
  scatter_grid_color = '#f3f3f3';
  $scatter_point_light = '#E6EAEE';
  $scatter_point_dark = '#5A8DEE';
  $white = '#fff';
  $black = '#000';

  themeColors = [this.$primary, this.$warning];
  // var themeColors = [ '#5A8DEE, '#FDAC41', $danger, $success, $info, $label_color];


  doughnutchartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    responsiveAnimationDuration: 500,
    title: {
      display: true,
      text: 'County Reports',
    },
  };
  doughnutchartData = {
    labels: ['Governance', 'Ministerial'],
    datasets: [
      {
        label: 'My First dataset',
        data: [2478, 5267],
        backgroundColor: this.themeColors,
      },
    ],
  };

  reports = [
    {
      title: 'Total Submitted Reports',
      number: 72,
      shade: 'blue',
    },
    {
      title: 'Pending Reports',
      number: 72,
      shade: 'blue',
    },
    {
      title: 'Total Submitted Reports',
      number: 72,
      shade: 'blue',
    },
    {
      title: 'Total Submitted Reports',
      number: 72,
      shade: 'blue',
    },
  ];

  reportsPending = [];
  reportsAwaitingApproval = [];

  constructor(...args) {
    super(...args);
    set(this, 'reportsPending', []);
    set(this, 'reportsAwaitingApproval', []);
  }

  async getReports() {
    const reports = await this.store.query('report', {
      filter: {
        status: 'pending',
      },
    });
    set(this, 'reportsPending', reports);
    set(this, 'pendingReports', reports.length);
  }

  transparentize(value, opacity) {
    var alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return colorLib(value).alpha(alpha).rgbString();
  }

  data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Total Submitted Votes',
        data: [12, 19, 3, 5, 2, 3],
        // borderWidth: 1,
        // borderColor: 'rgb(54, 162, 235)',
        backgroundColor: this.transparentize('rgb(54, 162, 235)', 1),
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  options = {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  number = 72;
}
