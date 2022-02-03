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
}
