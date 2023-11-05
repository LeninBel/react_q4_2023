import {
  useLoaderData,
  useMatch,
  useNavigate,
  useNavigation,
  useParams,
} from 'react-router-dom';
import { Book } from '../../services/book';
import { Loader } from '../loader/Loader';
import './ResultDetails.css';
import { useEffect } from 'react';

export const ResultDetails = () => {
  const match = useMatch('/search/:pageId/details/:detailsId');
  const res = useLoaderData() as Book;
  const navigation = useNavigation();
  const { pageId = 1 } = useParams();
  const navigate = useNavigate();
  const isLoading = navigation.state === 'loading';

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.ResultDetails')) {
        navigate(`/search/${pageId}`, { replace: true });
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => window.removeEventListener('click', handleOutsideClick);
  }, [navigate, pageId]);

  if (match && isLoading) {
    return <Loader />;
  }

  return (
    <div className="ResultDetails">
      <button
        className="ResultDetails_close"
        onClick={() => navigate(`/search/${pageId}`, { replace: true })}
      >
        X
      </button>
      {`numberOfPages ${res.numberOfPages}`}
    </div>
  );
};
