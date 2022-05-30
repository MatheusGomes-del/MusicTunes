/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      chosenImage: '',
    };
  }

  loadFile = (event) => {
    console.log(event.target.files[0]);
    this.setState({
      chosenImage: URL.createObjectURL(event.target.files[0]),
    });
  }

  render() {
    const { userInfos } = this.props;
    const { chosenImage } = this.state;
    return (
      <header data-testid="page-profile">
        <Header />
        <section
          className="container-profile
        justify-center items-center bg-gradient-to-r
        from-indigo-500 via-purple-500 to-pink-500"
        >
          <div className="square-profile flex justify-center items-center shadow-2x">
            <div className="container-picture-profilel">
              <img src={ chosenImage } alt="" className="img-profile" />
              <label htmlFor="img-profile">
                <input
                  type="file"
                  name="img"
                  id="img-profile"
                  className="elemnt-profile"
                  onChange={ this.loadFile }
                />
              </label>
            </div>
            <div>
              <p className="element-profile">
                Nome:
                {userInfos.name}
              </p>
              <p className="element-profile font-mono">
                Email:
                {userInfos.email}
              </p>
              <p className="element-profile font-mono">
                Description: Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Harum, itaque
                porro quisquam vel eum dignissimos doloremque
                ut labore! Sequi facere laudantium nihil amet
                quasi vero eligendi quo saepe perspiciatis at.
              </p>
            </div>
          </div>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfos: state.user,
});

Profile.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Profile);
