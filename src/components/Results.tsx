import { Component } from 'react';
import { Product } from '../interface/interfaces';

interface Props {
  items: Product[];
}

class Results extends Component<Props> {
  render() {
    return (
      <ul className="results-list">
        {this.props.items.map((item) => (
          <li key={item.id} className="results-item">
            <h2 className="results-title">{item.title}</h2>
            <p className="results-description">{item.description}</p>
            <img src={item.thumbnail} alt="" />
          </li>
        ))}
      </ul>
    );
  }
}

export default Results;
