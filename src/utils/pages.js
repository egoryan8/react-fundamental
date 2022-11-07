export const getPagesCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalPages) => {
  const pagesArray = [];

  for (let i = 0; i < totalPages; i++) {
    pagesArray.push(i + 1);
  }

  return pagesArray;
};
