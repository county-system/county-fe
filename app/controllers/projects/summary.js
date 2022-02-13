import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { sumUnic } from '../../utils/sum-unic';

export default class ProjectsSummaryController extends Controller {
  @service store;

  @tracked modelData = this.model;
  @tracked buttonGroupValue;
  @tracked topData = this.topCardsData();
  @tracked sideProgressData = this.sideProgressDataCal();
  @tracked dropdown = this.dropdownData();
  @tracked percentFilter = sumUnic(
    this.modelData,
    'implementing_entity',
    'project_cost'
  );
  @tracked totalSpending = this.totalSpendingData();
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
  }

  @action
  filterByAmount(value) {
    this.percentFilter = this.percentFilter.map((data) => {
      if (data.project_cost <= value) {
        return { ...data, color: 'green' };
      }
      return { ...data, color: 'purple' };
    });
  }

  @action
  sideProgressDataCal() {
    const progress = sumUnic(this.model, 'implementing_entity', 'project_cost');
    let total = 0;
    this.model.forEach((data) => {
      total += parseFloat(data.project_cost);
    });
    return progress.map((d) => {
      return {
        ...d,
        percent: parseInt((d.project_cost / total) * 100 * 10),
      };
    });
  }

  @action
  totalSpendingData() {
    let percentFilters = {};
    let total = 0;
    this.model.forEach((data) => {
      total += parseFloat(data.project_cost);
    });
    const percent = [5, 10, 50, 100];
    percent.forEach((element) => {
      percentFilters[`top ${element}`] = total * (element / 100);
    });

    return percentFilters;
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
    const result = [...Array(num)].map(() => {
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
        title: 'Total Cost',
        value: '278M',
        color: 'green',
      },
      {
        title: 'Incomplete',
        value: '15%',
        color: 'blue',
      },
      {
        title: 'Paid Amount',
        value: '(Blank)',
        color: 'yellow',
      },
      {
        title: '% Completed',
        value: '(Blank)',
        color: 'brown',
      },
      {
        title: 'Outstanding Amount',
        value: '(Blank)',
        color: 'red',
      },
    ];
    return data;
  }

  chartData = {
    type: 'doughnut',
    data: {
      labels: ['Governance', 'Ministerial'],
      datasets: [
        {
          label: 'My First dataset',
          data: [2478, 5267],
          backgroundColor: this.chartColors(2),
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 500,
      title: {
        display: false,
        text: 'County Reports',
      },
    },
  };

  barData = {
    type: 'bar',
    data: {
      labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
      datasets: [
        {
          label: 'Population (millions)',
          data: [2478, 5267, 734, 784, 433],
          backgroundColor: this.chartColors(5),
          borderColor: 'transparent',
        },
      ],
    },
    options: {
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each bar to be 2px wide
      elements: {
        rectangle: {
          borderWidth: 2,
          borderSkipped: 'left',
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 500,
      legend: { display: false },
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
            ticks: {
              stepSize: 1000,
            },
          },
        ],
      },
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050',
      },
    },
  };
}
