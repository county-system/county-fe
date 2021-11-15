import Controller from '@ember/controller';

export default class KpiController extends Controller {
    // {
  //     "id": "1245",
  //     "project_name": "Purchase of poultry equipment and feeds",
  //     "implementing_entity": "Agriculture, Pastoral Economy and Fisheries",
  //     "financial_year": "2019/2020",
  //     "sub_county": "turkana",
  //     "ward": "",
  //     "project_status": "tenderawarded",
  //     "project_cost": "1000000.00"
  // },
  // get data() {
  //   return this.args.data;
  // }
  // get chartConfig() {
  //   return {
  //     type: 'bar',
  //     data: this.data,
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           position: 'top',
  //         },
  //         title: {
  //           display: true,
  //           text: 'Chart.js Floating Bar Chart',
  //         },
  //       },
  //     },
  //   };
  // }

  // // get labels() {
  // //   console.log(this.model, '----');
  // //   return this.model.map((d) => d.financial_year);
  // // }

  // data = {
  //   labels: this.labels,
  //   datasets: [
  //     {
  //       label: 'Dataset 1',
  //       data: labels.map(() => {
  //         return [Utils.rand(-100, 100), Utils.rand(-100, 100)];
  //       }),
  //       backgroundColor: Utils.CHART_COLORS.red,
  //     },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => {
  //         return [Utils.rand(-100, 100), Utils.rand(-100, 100)];
  //       }),
  //       backgroundColor: Utils.CHART_COLORS.blue,
  //     },
  //   ],
  // };
}
