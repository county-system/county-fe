import { helper } from '@ember/component/helper';

export default helper(function budgetPercentage(budget, totalBudget) {
  if (budget > 0) {
    return (budget / totalBudget) * 100;
  }
});
