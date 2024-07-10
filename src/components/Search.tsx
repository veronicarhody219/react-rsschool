import { Component, ChangeEvent } from 'react';


interface Props {
  onSearch: (term: string) => void;
}

interface State {
  searchTerm: string;
}

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchTerm: '' };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onSearch(this.state.searchTerm);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="search-form">
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleChange}
          placeholder="Search for products..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    );
  }
}

export default Search;
