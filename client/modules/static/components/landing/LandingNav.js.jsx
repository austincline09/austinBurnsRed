/**
 * The navbar on the landing page is styled a little differently
 */

// import primary libraries
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// import third-party libraries
import classNames from 'classnames';

// import global components
import Base from '../../../../global/components/BaseComponent.js.jsx';
import CloseWrapper from '../../../../global/components/helpers/CloseWrapper.js.jsx';
import DropdownNav from '../../../../global/components/navigation/DropdownNav.js.jsx';

class LandingNav extends Base {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this._bind(
      '_openDropdown'
      , '_closeDropdown'
    );
  }

  _openDropdown(e) {
    e.stopPropagation();
    this.setState({
      isOpen: true
    });
  }

  _closeDropdown() {
    this.setState({
      isOpen: false
    });
  }

  render() {
    let { user } = this.props;
    let isScrolled = this.props.isScrolled;


    let headerClass = classNames(
      'header landing-header'
      , 'fixed'
      , { 'transparent': !isScrolled }

    )

    let topClass = classNames(
      "topbar landing-nav main-container"
      , { 'transparent': !isScrolled }
    )

    let pictureUrl = '/img/defaults/profile.png';
    if(user && user.profilePicUrl) {
      pictureUrl = user.profilePicUrl;
    }
    // console.log(pictureUrl);

    let profileImg = {backgroundImage: `url(${pictureUrl})`};

    return (
      <header className={headerClass} >
        <div className={topClass}>
          <CloseWrapper
            isOpen={this.state.isOpen}
            closeAction={this._closeDropdown}
          />

          <div className="actions">
            <div className="yt-row center-vert right">
              <ul className="navigation">
                <li>
                  <Link to="/products" activeClassName="active">Products</Link>
                </li>
                { user.username ?
                  <li className="dropdown">
                    <a onClick={this._openDropdown}>
                      <div className="-profile-pic" style={profileImg} />
                      <i className="fa fa-caret-down"></i>
                    </a>
                    <DropdownNav
                      isOpen={this.state.isOpen}
                    />
                  </li>
                  :
                  null
                }
              </ul>
              {!user.username ?
                  <div className="yt-row">
                    <Link to="/user/login" className="yt-btn small link ">Sign In</Link>
                    <Link to="/user/register" className="yt-btn small success ">Register</Link>
                  </div>
                :
                null
              }
            </div>
          </div>
        </div>
      </header>
    )
  }
}

LandingNav.propTypes = {
  isScrolled: PropTypes.bool
  , openDialog: PropTypes.func

}

const mapStoreToProps = (store) => {
  return {
    user: store.user.loggedIn.user
  }
}

export default connect(
  mapStoreToProps
)(LandingNav);
