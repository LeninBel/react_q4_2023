import { Component } from 'react';
import './Loader.css';

export class Loader extends Component {
  render() {
    return (
      <div className="loader_container">
        <div className="loader" />
        <p>Loading...</p>
      </div>
    );
  }
}
