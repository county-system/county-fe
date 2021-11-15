import Controller from '@ember/controller';
import { set } from '@ember/object';
import colorLib from '@kurkle/color';

export default class DashboardController extends Controller {
  totalReports = 0;
  totalUsers = 0;
  pendingReports = 0;
  awaitingApproval = 0;
  totalApproved = 0;
  totalRejected = 0;

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
        // backgroundColor: this.transparentize('rgb(54, 162, 235)', 0.5),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  type = 'bar';
  options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
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
