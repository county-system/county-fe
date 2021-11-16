import Route from '@ember/routing/route';

export default class KpiRoute extends Route {
  model() {
    return [
      {
        id: '1',
        project_name:
          'Heavy Grading/Gravelling Ai Junct. \u2013 Pokotom Pri., A1 Junct \u2013 Nayenae Emeyan \u2013Arid Zone and A1 Junct \u2013 Dc\u2019S Office \u2013 Youth Resource Centre',
        implementing_entity: 'Infrastructure , Transport & Public Works',
        financial_year: '2013/2014',
        sub_county: 'Turkana West',
        ward: 'Kakuma',
        project_status: 'complete',
        project_cost: '7271365.00',
      },
      {
        id: '2',
        project_name: 'Lotaka Ecd',
        implementing_entity: 'Education, Sports and SP',
        financial_year: '2014/2015',
        sub_county: 'Turkana West',
        ward: 'Kakuma',
        project_status: 'incomplete',
        project_cost: '6000000.00',
      },
      {
        id: '3',
        project_name: 'Komudei Ecd',
        implementing_entity: 'Education, Sports and SP',
        financial_year: '2014/2015',
        sub_county: 'Turkana West',
        ward: 'Kakuma',
        project_status: 'complete',
        project_cost: '6000000.00',
      },
      {
        id: '4',
        project_name: 'Kakuma Street Lights',
        implementing_entity:
          'Lands, Energy, Housing and Urban Areas Management',
        financial_year: '2014/2015',
        sub_county: 'Turkana West',
        ward: 'Kakuma',
        project_status: 'complete',
        project_cost: '19000000.00',
      },
      {
        id: '5',
        project_name: 'Arid Zone-Lokiding Road',
        implementing_entity: 'Infrastructure , Transport & Public Works',
        financial_year: '2014/2015',
        sub_county: 'Turkana West',
        ward: 'Kakuma',
        project_status: 'complete',
        project_cost: '23658707.00',
      },
    ];
  }
}
