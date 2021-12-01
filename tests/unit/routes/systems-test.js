import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | systems', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:systems');
    assert.ok(route);
  });
});
