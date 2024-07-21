import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Search from '../components/Search';
import Results from '../components/Results';
import Pagination from '../components/Pagination';
import * as React from 'react';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = 6; // Number of items per page
  const [totalPages, setTotalPages] = useState(1); // Initialize totalPages

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        const totalItems = data.products.length;
        const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
        setTotalPages(calculatedTotalPages);

        // Fetch data for the current page
        fetch(
          `https://dummyjson.com/products/search?q=${searchTerm}&page=${page}`,
        )
          .then((response) => response.json())
          .then((data) => {
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const slicedItems = data.products.slice(startIndex, endIndex);

            setItems(slicedItems);
            setLoading(false);
          })
          .catch(() => {
            setError(true);
            setLoading(false);
          });
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [searchTerm, page, itemsPerPage]);

  const handleSearch = (term: string) => {
    setSearchParams({ query: term, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ ...searchParams, page: newPage.toString() });
  };

  if (error) {
    return <div>Failed to load data.</div>;
  }

  return (
    <div>
      <Search onSearch={handleSearch} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Results items={items} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
