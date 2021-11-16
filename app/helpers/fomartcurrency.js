import { helper } from '@ember/component/helper';

const numberWithCommas = (x) => {
  return 'Ksh. ' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default helper(numberWithCommas);
