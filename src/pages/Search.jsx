import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super()

    this.state = {
      nameArtist: '',
      disabled: true, 
    }
  }

  getNameArtist = ({ target }) => {
    const { nameArtist } = this.state
    const minNumber = 1
    this.setState({
       nameArtist: target.value,
    })
    if(nameArtist.length >= minNumber) {
      this.setState({
        disabled: false,
      })
    } else {
      this.setState({
        disabled: true,
      })
    }
  }
   
  render() {
    const { disabled } = this.state
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <input type="text" data-testid="search-artist-input" onChange={ this.getNameArtist } />
          <button disabled={ disabled } type='submit' data-testid="search-artist-button">Pesquisar</button>
        </form>
      </div>
    );
  }
}

export default Search;
