import { useState } from 'react';
import * as React from 'react';

interface SearchProps {
  onSearch: (term: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
