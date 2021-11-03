export const queryStringFormat = {
  /*
    city: city=city_name
    category: category_query, cateogry=main or category=main:sub (need parsing)
    sortBy: condition, sort=price:asc sort=rating:desc (need parsing)
    availableDate: minRangeValue-maxRangeValue (need parsing)
    price: minRangeValue-maxRangeValue (need parsing)
    rating: rating=4~ AND rating=5
    quick_booking: quick_booking=true OR product_option=quick_booking
  */
  city: null,
  category: null,
  sort: null,
  availableDate: null,
  price: null,
  reviewScore: null,
  confirm_type: null,
};

const parseQueryByColon = (query) => {
  const queryArr = query.split(':');

  return {
    sortBy: queryArr[0],
    method: queryArr[1],
  };
};

const getParsedCategory = (query) => {
  const queryArr = query.split(':');
  if (queryArr.length === 2) {
    return {
      main: queryArr[0],
      sub: query,
    };
  }
  return {
    main: queryArr[0],
  };
};

const parseQueryByDash = (query) => {
  const queryArr = query.split('-');

  if (queryArr.length === 1) {
    if (query.startsWith('-')) {
      return {
        maxRangeValue: queryArr[0],
      };
    }
    return {
      minRangeValue: queryArr[0],
    };
  }

  return {
    minRangeValue: queryArr[0],
    maxRangeValue: queryArr[1],
  };
};

export const parseAndFormat = (query, eachQueryKey) => {
  if (eachQueryKey === 'category') {
    const parsedCategory = getParsedCategory(query[eachQueryKey]);
    query[eachQueryKey] = parsedCategory;
  }
  if (eachQueryKey === 'sort') {
    const parsedSortValue = parseQueryByColon(query[eachQueryKey]);
    query[eachQueryKey] = parsedSortValue;
  }

  if (eachQueryKey === 'availableDate' || eachQueryKey === 'price') {
    query[eachQueryKey] = parseQueryByDash(query[eachQueryKey]);
  }
};
