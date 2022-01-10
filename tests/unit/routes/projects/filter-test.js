import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | projects/filter', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:projects/filter');
    assert.ok(route);
  });
});
