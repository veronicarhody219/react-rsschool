import { Component } from 'react';


class ErrorButton extends Component {
  throwError = () => {
    throw new Error('Test Error');
  };

  render() {
    return <button onClick={this.throwError} className="error-button">Throw Error</button>;
  }
}

export default ErrorButton;
