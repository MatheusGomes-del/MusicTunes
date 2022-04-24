import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      loading: false,
    };
  }

  verifyCheck = () => {
    this.setState({
      checked: true,
      loading: true,
    }, async () => {
      const { trackId } = this.props;
      await addSong(trackId);
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { checked, loading } = this.state;
    return (
      (loading ? <Loading />
        : (
          <section>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor="check">
              Favorita
              <input
                onChange={ this.verifyCheck }
                checked={ checked }
                id="check"
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
              />
            </label>
          </section>
        )
      )
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
