import './Loader.css';

export const Loader = ({ id = '' }: { id: string }) => {
  return (
    <div data-testid="loader" className="loader_container">
      <div className="loader" />
      <p>{`Loading${id}...`}</p>
    </div>
  );
};
