import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl } = this.props;
    return (
      <section>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
