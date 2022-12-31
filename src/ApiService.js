const BASE_URL = 'https://images-api.nasa.gov'


function fetchRequest (path, options) {
  return fetch(BASE_URL + path, options)
  .then((res) => res.status >= 400 ? Promise.reject() : res)
  .then((res) => res.json())
  .catch((error) => console.log(`Error fetching ${path}`, error))
}

//SEARCH
export const getSearch = (searchWord, year_start, year_end) => {
  let queryString = '/search?q='+ searchWord + '&media_type=image';
  if (year_start && year_end) {
    queryString += '&year_start='+ year_start + '&year_end='+ year_end;
  } else if (year_start && !year_end) {
    queryString += '&year_start='+ year_start;
  }
  else if (!year_start && year_end) {
    queryString += '&year_end='+ year_end;
  }
  return fetchRequest(queryString);
}
