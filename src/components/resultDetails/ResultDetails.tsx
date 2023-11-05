import { Await, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Book } from '../../services/book';
import { Loader } from '../loader/Loader';
import './ResultDetails.css';
import { useEffect } from 'react';
import React from 'react';

type Data = {
  result: Promise<Book>;
};

export const ResultDetails = () => {
  const res = useLoaderData() as Data;
  const { pageId = 1 } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.ResultDetails') && !target.closest('.bookLink')) {
        navigate(`/search/${pageId}`, { replace: true });
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => window.removeEventListener('click', handleOutsideClick);
  }, [navigate, pageId]);

  return (
    <React.Suspense fallback={<Loader />}>
      <Await
        resolve={res.result}
        errorElement={<p>Opps something went wrong!</p>}
      >
        {(result) => {
          return (
            <div className="ResultDetails">
              <button
                className="ResultDetails_close"
                onClick={() => navigate(`/search/${pageId}`, { replace: true })}
              >
                X
              </button>
              {`numberOfPages ${result.numberOfPages}`}
            </div>
          );
        }}
      </Await>
    </React.Suspense>
  );
};
