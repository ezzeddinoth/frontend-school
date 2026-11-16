import { useNavigate } from 'react-router-dom';

export default function ErrorPage({ message = "Something went wrong." }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Error</h1>
      <p>{message}</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}