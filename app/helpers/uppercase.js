import { helper } from '@ember/component/helper';

const uppercase = (x) => {
  return x.toString().toUpperCase();
};

export default helper(uppercase);
