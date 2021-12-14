import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class KpiController extends Controller {
  @service store;
  @tracked modelData = this.model;
  @tracked value;
  @tracked type;
  @tracked dropDownValue;
  @tracked chartType1;
  @tracked totalProjectCosts = 0;
  @tracked incomplete = 0;
  @tracked complete = 0;
  @tracked dropdown = this.dropdownData();
  @tracked dropdownWard = this.dropdownDataWard();
  @tracked totalDatasets = [];
  @tracked pieData = this.pieDataTotalCost().newData;
  @tracked pieWardData;

  @tracked totalWardAmountSpent = this.pieDataTotalCost().totalWardAmount;
  @tracked totalProjectsCount = this.pieDataTotalCost().totalProjects;

  constructor() {
    super(...arguments);
    this.chartType1 = 'bar';
    this.type = 'pie';
  }

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
  chartTypeOption(data) {
    console.log(data);
    this.chartType1 = 'pie';
  }

  @action
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  @action
  dropdownData() {
    const dropdown = [];

    this.modelData.forEach((item) => {
      if (!dropdown.includes(item.implementing_entity)) {
        dropdown.push(item.implementing_entity);
      }
    });

    return dropdown;
  }

  @action
  dropdownDataWard() {
    const dropdown = [];

    this.modelData.forEach((item) => {
      if (!dropdown.includes(item.ward)) {
        dropdown.push(item.ward);
      }
    });
    return dropdown;
  }

  @action
  dropdownValueWard(event) {
    this.dropDownValue = event.target.value;
    this.pieWardData = this.wardData().newData;
  }

  @action
  dropdownValue(event) {
    this.value = event.target.value;
    this.totalProjectCosts = this.filteredKpiData().total;
    this.incomplete = this.filteredKpiData().incomplete;
    this.complete = this.filteredKpiData().complete;
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
  wardData() {
    const data = this.modelData;
    const implementing_entities = [];
    const labels = [];
    let totalPerWard = [];
    let totalWardAmount = 0;
    let totalProjects = 0;

    data.forEach((item) => {
      if (
        !implementing_entities.includes(item.implementing_entity) &&
        item.ward === this.dropDownValue
      ) {
        implementing_entities[item.implementing_entity] = parseInt(
          item.project_cost,
          10
        );
        totalWardAmount += parseInt(item.project_cost, 10);
        totalProjects += 1;
      } else if (
        implementing_entities.includes(item.implementing_entity) &&
        item.ward === this.dropDownValue
      ) {
        implementing_entities[item.implementing_entity] = implementing_entities[
          item.implementing_entity
        ] += parseInt(item.project_cost, 10);
        totalWardAmount += parseInt(item.project_cost, 10);
        totalProjects += 1;
      }
    });

    for (const key in implementing_entities) {
      totalPerWard.push(parseInt(implementing_entities[`${key}`], 10));
      labels.push(key);
    }
    const newData = {
      labels: labels,
      datasets: [
        {
          label: 'Money allocated',
          data: totalPerWard,
          backgroundColor: this.chartColors(totalProjects),
        },
      ],
    };

    return {
      newData,
    };
  }

  @action
  pieDataTotalCost() {
    const data = this.modelData;
    const wards = [];
    const labels = [];
    let totalPerWard = [];
    let totalWardAmount = 0;
    let totalProjects = 0;

    data.forEach((item) => {
      if (!wards.includes(item.ward) && item.ward !== 'turkana') {
        wards[item.ward] = parseInt(item.project_cost, 10);
        totalWardAmount += parseInt(item.project_cost, 10);
        totalProjects += 1;
      } else if (wards.includes(item.ward) && item.ward !== 'turkana') {
        wards[item.ward] = wards[item.ward] += parseInt(item.project_cost, 10);
        totalWardAmount += parseInt(item.project_cost, 10);
        totalProjects += 1;
      }
    });

    for (const key in wards) {
      totalPerWard.push(parseInt(wards[`${key}`], 10));
      labels.push(key);
    }
    const newData = {
      labels: labels,
      datasets: [
        {
          label: 'Total Sum of money allocated',
          data: totalPerWard,
          backgroundColor: this.chartColors(totalPerWard.length),
        },
      ],
    };

    return {
      newData,
      totalWardAmount,
      totalProjects,
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
}
