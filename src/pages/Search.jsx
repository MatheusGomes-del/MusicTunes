import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      nameArtist: '',
      artista: '',
      disabled: true,
      loading: false,
      loadingTwo: false,
      objListaMusicas: {},
    };
  }

  getNameArtist = ({ target }) => {
    const minNumber = 2;
    this.setState({
      nameArtist: target.value,
    }, () => {
      const { nameArtist } = this.state;
      if (nameArtist.length < minNumber) {
        this.setState({
          disabled: true,
        });
      } else {
        this.setState({
          disabled: false,
        });
      }
    });
  }

  clickButton = (event) => {
    event.preventDefault();
    const { nameArtist } = this.state;
    this.setState({
      artista: nameArtist,
      nameArtist: '',
      loading: true,
    }, async () => {
      const resposta = await searchAlbumsAPI(nameArtist);
      this.setState({
        loadingTwo: true,
        loading: false,
        objListaMusicas: resposta,
      });
    });
  }

  render() {
    const { disabled, loading, artista, loadingTwo, objListaMusicas } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          {loading ? <Loading />
            : (
              <>
                <input
                  type="text"
                  data-testid="search-artist-input"
                  onChange={ this.getNameArtist }
                />
                <button
                  disabled={ disabled }
                  onClick={ this.clickButton }
                  type="submit"
                  data-testid="search-artist-button"
                >
                  Pesquisar

                </button>
              </>
            )}
          {
            loadingTwo
              ? (
                <div>
                  <p>
                    Resultado de álbuns de:
                    {' '}
                    { artista }
                    {' '}
                  </p>
                  { objListaMusicas === undefined || objListaMusicas.length === 0
                    ? <p>Nenhum álbum foi encontrado</p> : (
                      objListaMusicas.map((albuns, index) => (
                        <Link
                          key={ index }
                          data-testid={ `link-to-album-${albuns.collectionId}` }
                          to={ `/album/${albuns.collectionId}` }
                        >
                          Album
                          <div>
                            <img
                              alt={ albuns.artistName }
                              src={ albuns.artworkUrl100 }
                            />
                            <p>{ albuns.collectionName }</p>
                            <p>{ albuns.artistName }</p>
                          </div>
                        </Link>
                      ))
                    )}
                </div>
              )
              : false
          }
        </form>

      </div>
    );
  }
}

export default Search;
