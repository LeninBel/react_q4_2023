const URL_BOOK_SEARCH = 'https://stapi.co/api/v2/rest/book/search';
const URL_BOOK = 'https://stapi.co/api/v2/rest/book';

export type Book = {
  uid: string;
  title: string;
  numberOfPages: number | null;
  publishedDay: number | null;
  publishedMonth: number | null;
  publishedYear: number | null;
};

type PageMeta = {
  firstPage: boolean;
  lastPage: boolean;
  numberOfElements: number;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

export type BooksResponse = {
  books: Book[];
  page: PageMeta;
};

export const findBook = async (
  term: string,
  pageNumber: number,
  pageSize: number
): Promise<BooksResponse | undefined> => {
  if (term !== '') {
    return fetchByTitle(term, pageNumber, pageSize);
  }

  return await fetchAll(pageNumber, pageSize);
};

export const getBook = async (id: string): Promise<Book> => {
  const response = await fetch(`${URL_BOOK}?uid=${id}`);

  const { book } = await response.json();

  return book;
};

const fetchAll = async (
  pageNumber: number,
  pageSize: number
): Promise<BooksResponse | undefined> => {
  try {
    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });
    const response = await fetch(`${URL_BOOK_SEARCH}?${params}`);

    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return undefined;
  }
};

const fetchByTitle = async (
  term: string,
  pageNumber: number,
  pageSize: number
): Promise<BooksResponse | undefined> => {
  try {
    const postData = new URLSearchParams();
    postData.append('name', term);
    postData.append('title', term);

    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });
    const response = await fetch(`${URL_BOOK_SEARCH}?${params}`, {
      method: 'POST',
      body: postData,
    });

    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return undefined;
  }
};
