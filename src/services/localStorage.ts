export const LOCALSTORAGE_KEY = 'searchTerm';

export const getLsSearchTerm = () =>
  localStorage.getItem(LOCALSTORAGE_KEY) ?? '';
