import { useNavigate, useParams } from 'react-router-dom';
import './Pagination.css';
import { AppContext } from '../../context/SearchContext';
import { useContext } from 'react';

export const Pagination = () => {
  const { results } = useContext(AppContext);
  const { pageId = 1 } = useParams();
  const navigate = useNavigate();

  return (
    <div className="Pagination">
      <div className="Pagination_buttons">
        {Array.from({ length: results?.page?.totalPages ?? 0 }).map((_, i) => (
          <button
            key={i + 1}
            className={`${i + 1 === +pageId ? 'button_active' : ''}`}
            onClick={() => {
              navigate(`/search/${i + 1}`, { replace: true });
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
