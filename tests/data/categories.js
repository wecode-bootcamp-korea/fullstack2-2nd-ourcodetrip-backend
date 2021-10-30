export const serviceCategoryData = [
  { id: 1, name: '항공권', query: 'service=tourticket' },
];

export const mainCategoryData = [
  { id: 1, name: '서울', serviceCategoryId: 1, query: 'category=tour' },
];

export const subCategoryData = [
  {
    id: 1,
    name: '시내투어',
    mainCategoryId: 1,
    query: 'category=tour:city_tour',
  },
];
export const countryData = [
  {
    id: 1,
    name: '대한민국',
  },
];

export const cityCategoryData = [
  {
    id: 1,
    name: '서울',
    countryId: 1,
  },
];

export const cityImageData = [
  {
    id: 1,
    imageUrl:
      'https://d2ur7st6jjikze.cloudfront.net/landscapes/4744_medium_square_1535960572.jpg?1535960572',
    cityId: 1,
  },
];
