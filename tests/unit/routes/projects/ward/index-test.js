import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | projects/ward/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:projects/ward/index');
    assert.ok(route);
  });
});
