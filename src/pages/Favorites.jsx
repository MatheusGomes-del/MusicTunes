import React from 'react';
import { connect } from 'react-redux';
import PropTypes, { object } from 'prop-types';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    const { FavoriteMusics } = this.props;
    return (
      <div data-testid="page-favorites">
        <Header />
        { FavoriteMusics.map((music) => (
          <section
            key={ music.trackId }
            className="container-Favmusics shadow-xl shadow-indigo-500/50
             bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            <div className="flex items-center">
              <img src={ music.artworkUrl100 } alt="album-of-artist" id="imgFavMusic" />
              <p
                className="text-albun font-mono"
              >
                { music.trackName }

              </p>
            </div>
            <div>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
            </div>
          </section>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  FavoriteMusics: state.favoriteSongsId,
});

Favorites.propTypes = {
  FavoriteMusics: PropTypes.arrayOf(object),
}.isRequired;

export default connect(mapStateToProps, null)(Favorites);
