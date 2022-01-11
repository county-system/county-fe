import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ProjectsShowController extends Controller {
  @tracked modelData = this.model;
}
