import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class KpiController extends Controller {
  @service store;
  @tracked value;
  @tracked type = 'pie';
  @tracked dropdown = this.dropdownData();
  @tracked totalProjectCosts = 0;
  @tracked incomplete = 0;
  @tracked complete = 0;
  @tracked modelData = [];

  // get kpi() {
  //   return this.model;
  // }



  CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
  };

  @action
  dropdownData() {
    this.modelData = this.model;
    const dropdown = [];

    this.modelData.forEach((item) => {
      if (!dropdown.includes(item.implementing_entity)) {
        dropdown.push(item.implementing_entity);
      }
    });

    return dropdown;
  }

  @action
  dropdownValue(event) {
    this.value = event.target.value;
    this.totalProjectCosts = this.filteredKpiData().total;
    this.incomplete = this.filteredKpiData().incomplete;
    this.complete = this.filteredKpiData().complete;
    this.tableRows = this.tableData().tableRows;
    this.tableHeaders = this.tableData().tableHeaders;
  }

  @action
  filteredKpiData() {
    const data = this.modelData;
    let total = 0;
    let incomplete = 0;
    let complete = 0;

    data.forEach((item) => {
      if (item.implementing_entity === this.value) {
        total += parseInt(item.project_cost, 10);
        if (item.project_status === 'incomplete') {
          incomplete += 1;
        } else if (item.project_status === 'complete') {
          complete += 1;
        }
      }
    });

    return {
      incomplete,
      complete,
      total,
    };
  }

  @action
  pieDataTotalCost() {
    const data = this.modelData;
    const labels = [];
    let total = [];

    data.forEach((item) => {
      if (item.implementing_entity === this.value) {
        if (item.implementing_entity === this.value) {
          // total += parseInt(item.project_cost, 10);
          total.push(parseInt(item.project_cost, 10));
          labels.push(item.sub_county);
        }
      }
    });

    return {
      total,
      labels,
    };
  }

  @action
  formattedData(key = 'sub_county', value = 'project_status') {
    const data = this.modelData;
    const labels = [];
    const datasets = [];

    data.forEach((item) => {
      labels.push(item[key]);
      datasets.push(item[value]);
    });

    return {
      labels,
      datasets,
    };
  }
  options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  data = {
    // labels: this.pieDataTotalCost().labels,
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        // data: this.pieDataTotalCost().total,
        data: [12, 19, 5, 2, 3],
        backgroundColor: Object.values(this.CHART_COLORS),
      },
    ],
  };
}
