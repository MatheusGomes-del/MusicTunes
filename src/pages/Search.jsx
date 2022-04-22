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
    const minNumber = 2
    this.setState({
      nameArtist: target.value,
    }, () => {
      const { nameArtist } = this.state
      if(nameArtist.length < minNumber) {
        this.setState({
          disabled: true,
        })
      } else {
        this.setState({
          disabled: false,
        })
      }
    })
  }
   
  render() {
    const { disabled, nameArtist } = this.state
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <input type="text" data-testid="search-artist-input" name="nameArtist" value={ nameArtist } onChange={ this.getNameArtist } />
          <button disabled={ disabled } type='submit' data-testid="search-artist-button">Pesquisar</button>
        </form>
      </div>
    );
  }
}

export default Search;
