import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | projects/show', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:projects/show');
    assert.ok(controller);
  });
});
