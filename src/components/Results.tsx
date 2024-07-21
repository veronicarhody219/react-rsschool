import * as React from 'react';
import { Link } from 'react-router-dom';

interface ResultsProps {
  items: Array<{ id: number; title: string; description: string }>;
}

const Results = ({ items }: ResultsProps) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Link to={`/details/${item.id}`}>{item.title}</Link>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default Results;
