function adLatLngToData(data) {
  Object.keys(data).forEach(function (key) {
    if (key.indexOf('lat') !== -1) {
      data[key] = parseFloat(data[key]);
    }
  });
  return data;
}

const data = [
  {
    id: 1,
    first_name: 'Park',
    last_name: 'Goulborn',
    email: 'pgoulborn0@facebook.com',
    gender: 'Genderqueer',
    ip_address: '115.223.142.147',
  },
  {
    id: 2,
    first_name: 'Katlin',
    last_name: 'Berg',
    email: 'kberg1@deliciousdays.com',
    gender: 'Genderqueer',
    ip_address: '126.140.113.93',
  },
  {
    id: 3,
    first_name: 'Neddy',
    last_name: 'Proschke',
    email: 'nproschke2@tmall.com',
    gender: 'Genderfluid',
    ip_address: '215.114.2.52',
  },
  {
    id: 4,
    first_name: 'Evelin',
    last_name: 'Espinay',
    email: 'eespinay3@vk.com',
    gender: 'Female',
    ip_address: '204.118.108.236',
  },
  {
    id: 5,
    first_name: 'Norma',
    last_name: 'Sanderson',
    email: 'nsanderson4@noaa.gov',
    gender: 'Female',
    ip_address: '118.33.199.241',
  },
  {
    id: 6,
    first_name: 'Rois',
    last_name: 'Martindale',
    email: 'rmartindale5@twitpic.com',
    gender: 'Polygender',
    ip_address: '87.105.222.57',
  },
];

console.log(adLatLngToData(data));
