import Controller from '@ember/controller';

export default class AdminMetricsController extends Controller {
  lineChartData = {
    labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
    datasets: [
      {
        label: 'Africa',
        data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
        borderColor: '#5A8DEE',
        fill: false,
      },
      {
        data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
        label: 'Asia',
        borderColor: '#39DA8A',
        fill: false,
      },
      {
        data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
        label: 'Europe',
        borderColor: '#FF5B5C',
        fill: false,
      },
      {
        data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
        label: 'Latin America',
        borderColor: '#FDAC41',
        fill: false,
      },
      {
        data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
        label: 'North America',
        borderColor: '#475F7B',
        fill: false,
      },
    ],
  };

  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top',
    },
    hover: {
      mode: 'label',
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            color: '#dae1e7',
          },
          scaleLabel: {
            display: true,
          },
        },
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            color: '#dae1e7',
          },
          scaleLabel: {
            display: true,
          },
        },
      ],
    },
    title: {
      display: true,
      text: 'World population per region (in millions)',
    },
  };
}
