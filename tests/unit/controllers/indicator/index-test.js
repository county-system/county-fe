import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | indicator/index', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:indicator/index');
    assert.ok(controller);
  });
});
