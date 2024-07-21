import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (error) {
    return <div>Failed to load data.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {item && (
        <>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </>
      )}
    </div>
  );
};

export default DetailsPage;
