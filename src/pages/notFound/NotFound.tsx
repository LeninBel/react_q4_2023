import { useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();
  const isMatch = useMatch('/notFound');

  useEffect(() => {
    if (!isMatch) {
      navigate(`/notFound`);
    }
  }, [isMatch, navigate]);

  return <div>Not Found page</div>;
};
