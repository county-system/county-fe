import Controller from '@ember/controller';

export default class DashController extends Controller {
  // Chart Data

  grid_line_color = '#dae1e7';

  horizontalChartData = {
    labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
    datasets: [
      {
        axis: 'y',
        label: 'Population (millions)',
        fill: false,
        data: [2478, 5267, 734, 784, 433],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        borderColor: 'transparent',
        borderWidth: 1,
      },
    ],
  };
  horizontalChartOptions = {
    indexAxis: 'y',
    elements: {
      rectangle: {
        borderWidth: 2,
        // borderSkipped: 'right',
        borderSkipped: 'top',
      },
    },
    responsive: true,
    // maintainAspectRatio: false,
    responsiveAnimationDuration: 500,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            color: this.grid_line_color,
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
            color: this.grid_line_color,
          },
          scaleLabel: {
            display: true,
          },
        },
      ],
    },
    title: {
      display: true,
      text: 'Predicted world population (millions) in 2050',
    },
  };
}
