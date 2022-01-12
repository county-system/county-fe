import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | currencyShort', function (hooks) {
  setupRenderingTest(hooks);

  // TODO: Replace this with your real tests.
  test('it shortens one thousand', async function (assert) {
    this.set('thousand', '1000');

    await render(hbs`{{currency-short this.thousand}}`);

    assert.dom(this.element).hasText('1K');
  });
  test('it shortens one million', async function (assert) {
    this.set('million', '1000000');

    await render(hbs`{{currency-short this.million}}`);

    assert.dom(this.element).hasText('1M');
  });
  test('it shortens one billion', async function (assert) {
    this.set('billion', '1000000000');

    await render(hbs`{{currency-short this.billion}}`);

    assert.dom(this.element).hasText('1B');
  });
  test('it shortens one trillion', async function (assert) {
    this.set('trillion', '1000000000000');

    await render(hbs`{{currency-short this.trillion}}`);

    assert.dom(this.element).hasText('1T');
  });
});
