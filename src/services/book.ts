const URL_BOOK = 'https://stapi.co/api/v2/rest/book/search';

export type Book = {
  uid: string;
  title: string;
  numberOfPages: number | null;
  publishedDay: number | null;
  publishedMonth: number | null;
  publishedYear: number | null;
};

export const findBook = async (term: string): Promise<Book[] | undefined> => {
  if (term !== '') {
    return fetchByTitle(term);
  }

  return await fetchAll();
};

const fetchAll = async (): Promise<Book[] | undefined> => {
  try {
    const response = await fetch(URL_BOOK);

    const { books } = await response.json();

    return books;
  } catch (error) {
    console.log(error);
  }
};

const fetchByTitle = async (term: string): Promise<Book[] | undefined> => {
  try {
    const postData = new URLSearchParams();
    postData.append('name', term);
    postData.append('title', term);

    const response = await fetch(URL_BOOK, {
      method: 'POST',
      body: postData,
    });

    const { books } = await response.json();
    return books;
  } catch (error) {
    console.log(error);
  }
};
