import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProjectsController extends Controller {
  @tracked modelData = this.model;
  @tracked topData = this.topCardsData();
  @tracked sideProgressData = this.progressData;

  @action
  chartColors(num) {
    const result = [...Array(num)].map((_) => {
      return `rgb(${Math.round(Math.random() * 255)}, ${Math.round(
        Math.random() * 255
      )}, ${Math.round(Math.random() * 255)})`;
    });
    return result;
  }

  @action
  topCardsData() {
    const data = [
      {
        title: 'Budget',
        value: '2bn',
        color: 'purple',
      },
      {
        title: 'Total Projects Cost',
        value: '278M',
        color: 'green',
      },
      {
        title: 'Total Projects Incomplete',
        value: '15%',
        color: 'blue',
      },
      {
        title: 'Paid Amount',
        value: '(Blank)',
        color: 'yellow',
      },
      {
        title: 'Outstanding Amount',
        value: '(Blank)',
        color: 'red',
      },
      {
        title: '% Completed',
        value: '(Blank)',
        color: 'brown',
      },
    ];
    return data;
  }

  chartData = {
    type: 'doughnut',
    data: {
      labels: ['GOVERNANCE', 'MINISTERIAL'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [60, 40],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
          hoverOffset: 4,
        },
      ],
    },
  };

  progressData = [
    {
      title: 'Infrastructure, Transport and Public Works',
      value: '0.27bn',
      percentage: '99',
    },
    {
      title: 'Education, Sports and Social Protection',
      value: '0.226bn',
      percentage: '50',
    },
    {
      title: 'Lands, Energy, Housing and Urban Areas Management',
      value: '0.226bn',
      percentage: '40',
    },
    {
      title: 'Public Service, Administration and Disaster Management',
      value: '0.226bn',
      percentage: '70',
    },
    {
      title: 'Health and Sanitation Services',
      value: '0.226bn',
      percentage: '20',
    },
    {
      title: 'Finance and Economic Planning',
      value: '0.226bn',
      percentage: '40',
    },
    {
      title: 'Water, Environment & Mineral Resources',
      value: '0.226bn',
      percentage: '40',
    },
    {
      title: 'Trade, Gender and Youth Affairs',
      value: '0.226bn',
      percentage: '40',
    },
    {
      title: 'Agriculture, Pastoral Economy and Fisheries',
      value: '0.226bn',
      percentage: '40',
    },
    {
      title: 'Tourism, Culture and Natural Resources',
      value: '0.226bn',
      percentage: '40',
    },
    {
      title: 'County Assembly',
      value: '0.226bn',
      percentage: '40',
    },
    {
      title: 'Office of the Governor',
      value: '0.226bn',
      percentage: '40',
    },
  ];
}
