export const getRequest = (url: RequestInfo, options: RequestInit): Promise<void | object> => {
  return fetch(url, options)
    .then((response) => {
      return response.json();
    });
};
