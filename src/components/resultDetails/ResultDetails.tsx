import { useNavigate, useParams } from 'react-router-dom';
import { Book, getBook } from '../../services/book';
import { Loader } from '../loader/Loader';
import './ResultDetails.css';
import { useEffect, useState } from 'react';

export const ResultDetails = () => {
  const { pageId = 1, detailsId = '' } = useParams();
  const [result, setResult] = useState<Book | null>(null);
  const navigate = useNavigate();
  const [isLoading, seIsLoading] = useState(false);

  useEffect(() => {
    seIsLoading(true);
    const getData = async () => {
      const res = await getBook(detailsId);

      if (!res) {
        navigate('/notFound');
      }

      setResult(res);
      seIsLoading(false);
    };
    getData();
  }, [detailsId, navigate]);

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

  if (isLoading) {
    return <Loader id={' card'} />;
  }

  if (!result) {
    return null;
  }

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
};
