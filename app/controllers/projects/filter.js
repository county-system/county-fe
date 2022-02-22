import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProjectsFilterController extends Controller {
  queryParams = ['search'];
  search = '';

  @tracked isSearching = false;
  @tracked modelData = this.model;
  @tracked departmentDropdown = this.dropdownData();
  @tracked wardDropdown = this.wardDropdownData();
  @tracked secondOption = false;

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
  dropdownValueDepartment(event) {
    this.value = event?.target?.value;
    this.secondOption = false;
    this.modelData = this.model.filter((data) => {
      return data.implementing_entity == this.value;
    });

    this.secondOption = true;
  }

  @action
  wardDropdownData() {
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
    this.value = event?.target?.value;
    console.log(this.value);

    this.modelData = this.modelData.filter((data) => {
      return data.ward == this.value;
    });
  }
}
