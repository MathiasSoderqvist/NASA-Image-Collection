const BASE_URL = 'https://images-api.nasa.gov'


function fetchRequest (path, options) {
  return fetch(BASE_URL + path, options)
  .then((res) => res.status >= 400 ? Promise.reject() : res)
  .then((res) => res.json())
  .catch((error) => console.log(`Error fetching ${path}`, error))
}

//SEARCH
export const getSearch = (searchWord, year_start, year_end) => {
  return fetchRequest('/search?q='+ searchWord + '&year_start='+ year_start + '&year_end='+ year_end);
}
