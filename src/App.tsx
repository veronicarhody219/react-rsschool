import { Component } from 'react';
import './App.css'; 
import Search from './components/Search';
import Results from './components/Results';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';
import { Product } from './interface/interfaces';

interface State {
  items: Product[];
  error: boolean;
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { items: [], error: false };
  }

  componentDidMount() {
    this.fetchItems(localStorage.getItem('searchTerm') || '');
  }

  fetchItems = (searchTerm: string) => {
    const apiUrl = searchTerm
      ? `https://dummyjson.com/products/search?q=${searchTerm}`
      : `https://dummyjson.com/products`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ items: data.products || [] });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({ error: true });
      });
  };

  handleSearch = (term: string) => {
    this.fetchItems(term);
  };

  render() {
    if (this.state.error) {
      return <h1 className="error">Failed to load data.</h1>;
    }

    return (
      <ErrorBoundary>
        <div className="container">
          <Search onSearch={this.handleSearch} />
          <Results items={this.state.items} />
          <ErrorButton />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
