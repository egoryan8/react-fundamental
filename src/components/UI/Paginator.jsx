import React from 'react';

const Paginator = ({ pagesArray, currentPage, setCurrentPage }) => {
  return (
    <div className="pagination__wrapper">
      {pagesArray.map((p) => (
        <span
          onClick={() => {
            setCurrentPage(p);
            window.scrollTo(0, 0);
          }}
          key={p}
          className={
            p === currentPage ? 'pagination__item pagination__item_active' : 'pagination__item'
          }>
          {p}
        </span>
      ))}
    </div>
  );
};

export default Paginator;
