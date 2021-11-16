import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class KpiController extends Controller {
  @service store;
  @tracked value;
  @tracked type = 'bar';
  @tracked dropdown = this.dropdownData();
  @tracked totalProjectCosts = 0;
  @tracked incomplete = 0;
  @tracked complete = 0;
  @tracked modelData = [];

  // get kpi() {
  //   return this.model;
  // }

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
    const tableHeaders = [];
    const tableRows = [];

    data.forEach((item) => {
      if (item.implementing_entity === this.value) {
        for (const [key] of Object.entries(item)) {
          tableHeaders.push({
            name: `${key}`,
            valuePath: `${key}`,
          });
        }
        tableRows.push(item);
      }
    });
    console.log(tableRows);

    return {
      tableHeaders,
      tableRows,
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
    labels: this.formattedData().labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: this.formattedData().datasets,
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
}
