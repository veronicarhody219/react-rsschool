import { useState, useEffect } from 'react';

function UseSearchQuery() {
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem('searchQuery') || '',
  );
  useEffect(() => {
    return () => localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  return { searchQuery, setSearchQuery };
}

export default UseSearchQuery;
