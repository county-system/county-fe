import { helper } from '@ember/component/helper';
import { capitalize } from '@ember/string';

const capital = (x) => {
  return capitalize(x.toString());
};
export default helper(capital);
