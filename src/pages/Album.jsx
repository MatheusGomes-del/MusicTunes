import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collectionName: '',
      artworkUrl: '',
      response: [],
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;

    this.responseMusics(params);
  }

  responseMusics = async (params) => {
    const response = await getMusics(params.id);
    const favoriteMusics = await getFavoriteSongs();
    this.setState({
      artistName: response[0].artistName,
      collectionName: response[0].collectionName,
      artworkUrl: response[0].artworkUrl100,
      response,
      favoriteSongs: favoriteMusics,
    });
  }

  render() {
    const { artistName,
      collectionName, response, artworkUrl, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ artistName }</h1>
        <h2 data-testid="album-name">{ collectionName }</h2>
        <img src={ artworkUrl } alt="" />
        {response.map((item, index) => (<MusicCard
          key={ index }
          trackName={ item.trackName }
          previewUrl={ item.previewUrl }
          trackId={ item.trackId }
          favoriteSongs={ favoriteSongs.map((musics) => musics) }
        />)).slice(1)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string,
  params: PropTypes.string,
  artworkUrl: PropTypes.string,
}.isRequired;

export default Album;
