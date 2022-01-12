import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ProjectsWardIndexController extends Controller {
  @tracked modelData = this.model;
}
