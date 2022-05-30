import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import favoriteMusics from '../redux/action';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      loading: false,
    };
  }

  async componentDidMount() {
    const { favoriteSongs, trackId } = this.props;
    if (favoriteSongs.some((favorite) => favorite.trackId === trackId)) {
      this.setState({ checked: true });
    } else {
      this.setState({ checked: false });
    }
  }

  verifyCheck = ({ target }) => {
    if (target.checked) {
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
    } else {
      this.setState({
        checked: false,
      });
    }
  }

  sendMusicsFavorites = (event) => {
    event.preventDefault();
    const { sendIdMusic, response } = this.props;
    if (event.target.checked) {
      const musicOfAlbum = response.reduce((acumulator, music) => {
        if (music.trackId === Number(event.target.value)) {
          acumulator = music;
        }
        return acumulator;
      }, {});
      sendIdMusic(musicOfAlbum);
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { checked, loading } = this.state;
    return (
      (loading ? <Loading />
        : (
          <section
            className="container-musics shadow-xl
          shadow-indigo-500/50
          "
          >
            <div className="squares-musics">
              <p
                className="text-albun font-mono"
              >
                { trackName }

              </p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="check">
                <input
                  onChange={ this.verifyCheck }
                  checked={ checked }
                  id="check"
                  value={ trackId }
                  type="checkbox"
                  onClick={ this.sendMusicsFavorites }
                  data-testid={ `checkbox-music-${trackId}` }
                  className="accent-pink-500"
                />
              </label>
            </div>
          </section>
        )
      )
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendIdMusic: (music) => dispatch(favoriteMusics(music)),
});

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default connect(null, mapDispatchToProps)(MusicCard);
