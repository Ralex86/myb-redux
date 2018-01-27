import React, { Component } from 'react';

import styles from '../styles/eventlist.css';
import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
//import FaGroup from 'react-icons/lib/fa/group'

Moment.globalMoment = moment;

Moment.globalLocale = 'fr'; // set this instance to use French
Moment.globalFormat = 'LLLL'; // dimanche 15 juillet 2012 11:01
Moment.globalElement = 'span';

export default class EventList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const sports = this.props.sports;
    const events = this.props.events.map(event => {
      let sport_event = sports.find(sport => {
        return sport.id === event.id_sport;
      });
      let name_key = sport_event.name_key.split('_').slice(1);
      let picture_url = sport_event.picture_200h;
      let blocked_places =
        event.confrontation_type.max_players - event.slots.confirmed > 0
          ? event.slots.confirmed
          : event.confrontation_type.max_players;
      let nb_places = event.confrontation_type.max_players;

      return {
        id: event.id_event,
        date: event.date,
        name: event.name,
        name_sport: name_key.join(' ').toLowerCase(),
        picture_url: picture_url,
        blocked_places: blocked_places,
        nb_places: nb_places,
      };
    });

    console.log('eventlist', this.props.requestEventView);

    return (
      <div className={styles.container}>
        <div className={styles.headerList}>
          <h2>Liste des évènements</h2>
        </div>
        <ul>
          {events !== null &&
            events.map(event => (
              <Event
                requestEventView={this.props.requestEventView}
                key={event.id}
                {...event}
              />
            ))}
        </ul>
      </div>
    );
  }
}

function Event(props) {
  const pictureStyle = props.picture_url && {
    backgroundImage: `url("${props.picture_url}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat no-repeat',
    width: '100%',
  };

  const dateToFormat = props.date;

  return (
    <li
      className={
        props.nb_places - props.blocked_places <= 0 && props.nb_places !== null
          ? styles.noRemainingPlaces
          : styles.remainingPlaces
      }
      onClick={props.requestEventView}
    >
      <div className={styles.header}>
        <div style={pictureStyle} />
      </div>
      <div className={styles.badge}>
        <span>
          {props.nb_places !== null
            ? props.blocked_places + '/' + props.nb_places
            : '∞'}
        </span>
      </div>
      <div className={styles.footer}>
        <span>{props.name}</span>
        <span>{props.name_sport}</span>
        <Moment locale="fr" format="LLLL" date={dateToFormat} />
      </div>
    </li>
  );
}
