import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { sumUnic } from '../../utils/sum-unic';

export default class ProjectsController extends Controller {
  @service store;

  @tracked modelData = this.model;
  @tracked topData = this.topCardsData();
  @tracked sideProgressData = this.progressData;
  @tracked dropdown = this.dropdownData();
  @tracked value;
  @tracked tableData = sumUnic(
    this.modelData,
    'implementing_entity',
    'project_cost'
  );
  @tracked wardProjects = sumUnic(this.modelData, 'ward', 'project_cost');

  @action
  dropdownValue(event) {
    this.value = event?.target?.value;
    if (this.value == 'all') {
      this.modelData = this.model;
    } else {
      this.modelData = this.model.filter((data) => {
        return data.implementing_entity == this.value;
      });
    }

    this.tableData = sumUnic(
      this.modelData,
      'implementing_entity',
      'project_cost'
    );
    this.wardProjects = sumUnic(this.modelData, 'ward', 'project_cost');
    console.log(
      this.value,
      this.modelData.length,
      this.tableData.length,
      this.wardProjects.length
    );
  }

  @action
  dropdownData() {
    const dropdown = [];
    this.model.forEach((item) => {
      if (!dropdown.includes(item.implementing_entity)) {
        dropdown.push(item.implementing_entity);
      }
    });
    return dropdown;
  }

  @action
  chartColors(num) {
    // eslint-disable-next-line no-unused-vars
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
          data: [36, 64],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
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
