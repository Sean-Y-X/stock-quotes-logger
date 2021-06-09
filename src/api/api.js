const BASE_URL = "https://join.reckon.com/";

function handleResponse(response) {
  if (response.status >= 400) {
    return response.json().then((result) => Promise.reject(result));
  }

  return response.json();
}

function handleError(error) {
  return Promise.reject(error);
}

function getJson(url) {
  return fetch(`${BASE_URL}${url}`, {
    method: "GET",
  })
    .then(handleResponse)
    .catch(handleError);
}

export function fetchStockQuotes() {
  return getJson("stock-pricing");
}
