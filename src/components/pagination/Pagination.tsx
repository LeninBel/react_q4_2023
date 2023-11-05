import { useNavigate, useParams } from 'react-router-dom';
import './Pagination.css';

type Props = {
  totalPages: number;
};

export const Pagination = ({ totalPages }: Props) => {
  const { pageId = 1 } = useParams();
  const navigate = useNavigate();

  return (
    <div className="Pagination">
      <div className="Pagination_buttons">
        {Array.from({ length: totalPages }).map((_, i) => (
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
