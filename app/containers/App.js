import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';

// Presentational components
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import EventList from '../components/EventList';
import Map from '../components/Map';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

// action available here
import { fetchUser } from '../actions/userActions';
import { fetchAssets } from '../actions/assetsActions';
import { fetchEvents } from '../actions/eventsActions';
import { requestEventView, requestMainView } from '../actions/viewActions';

// loading styles
import FaArrowCircleLeft from 'react-icons/lib/fa/arrow-circle-left';
import styles from '../styles/app.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchAssets();
    this.props.fetchUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.me !== this.props.me) {
      const { latitude, longitude, last_location_update } = nextProps.me[0];
      nextProps.fetchEvents(latitude, longitude, 100000, last_location_update);
    }
  }

  render() {
    const {
      main,
      me,
      events,
      assets,
      isFetchingUser,
      isFetchingEvents,
      isFetchingAssets,
    } = this.props;

    const isUserEmpty = me.length === 0;
    const isEventsEmpty = events.length === 0;
    const isAssetsEmpty = assets.length === 0;
    var position = [];

    if (!isEventsEmpty) {
      position = events[0].map(event => {
        let latitude = event.place.latitude;
        let longitude = event.place.longitude;
        let obj = {
          position: {
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
          },
        };
        return obj;
      });
    }

    return (
      <div>
        <Navbar />
        {!isUserEmpty && <Profile me={me[0]} />}

        {position.length > 0 && (
          <Map
            containerElement={
              <div
                style={{
                  position: 'fixed',
                  zIndex: 2,
                  height: '23em',
                  width: '100%',
                }}
              />
            }
            mapElement={<div style={{ height: '23em', width: '100%' }} />}
            latitude={parseFloat(me[0].latitude)}
            longitude={parseFloat(me[0].longitude)}
            markers={position}
          />
        )}

        {isAssetsEmpty ? (
          //margin-left: -100%;
          <div>Chargement des évènements...</div>
        ) : (
          <div
            className={styles.wrapper}
            style={main ? { marginLeft: 0 } : { marginLeft: '-100%' }}
          >
            <div className={styles.eventlist}>
              <EventList
                events={events[0]}
                sports={assets[0].sports}
                requestEventView={this.props.requestEventView}
              />
            </div>
            <div className={styles.event}>
              <h2 onClick={this.props.requestMainView}>
                <FaArrowCircleLeft />
                <span>Retour</span>
              </h2>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// which props of the global state I want to extract
// dont forget I rename the reducer in the export
// user - assets - events
const mapStateToProps = state => {
  //view state
  console.log('mapState', state.view.main);
  const main = state.view.main;

  const assets = state.assets.assetsFetched;
  const isFetchingAssets = state.assets.isFetching;

  const events = state.events.eventsFetched;
  const isFetchingEvents = state.events.isFetching;

  const me = state.user.me;
  const isFetchingUser = state.user.isFetching;

  return {
    main,
    me,
    events,
    assets,
    isFetchingUser,
    isFetchingEvents,
    isFetchingAssets,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestEventView: () => {
      dispatch(requestEventView());
    },
    requestMainView: () => {
      dispatch(requestMainView());
    },
    fetchUser: () => {
      dispatch(fetchUser());
    },
    fetchAssets: () => {
      dispatch(fetchAssets());
    },
    fetchEvents: (latitude, longitude, radius, last_location_update) => {
      dispatch(fetchEvents(latitude, longitude, radius, last_location_update));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
