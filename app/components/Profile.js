import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaRotateLeft from 'react-icons/lib/fa/rotate-left';
import styles from '../styles/profile.css';

const Profile = props => {
  const { last_name, first_name, age, latitude, longitude } = props.me;

  const picture_url = props.me.picture_medium;
  const city = props.me.city.name;

  const pictureStyle = {
    backgroundImage: `url(${picture_url})`,
  };

  const user_info = (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.picture} style={pictureStyle} />
        <div className={styles.infos}>
          <div>
            <span>{first_name}</span>
            <span>{last_name.toUpperCase()}</span>
          </div>
          <div>
            <span>{age}</span>
            <span>{city}</span>
          </div>
          <div>
            <a>
              INFOS
              <span />
            </a>
            <a>EVENEMENTS</a>
            <a>AMIS</a>
          </div>
        </div>
      </div>
      <div className={styles.footer}>Infoss</div>
    </div>
  );

  return (
    <div>
      <FlippingCard user_info={user_info} />
    </div>
  );
};

class FlippingCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rotate: 0,
    };
  }

  render() {
    const { rotate } = this.state;
    return (
      <Motion
        style={{ y: rotate == 0 ? rotate : spring(rotate) }}
        onRest={() => {
          window.setTimeout(() => {
            if (this.state.rotate % 360 === 0) {
              this.setState({ rotate: 0 });
            }
          }, 0);
        }}
      >
        {({ y }) => (
          <div className={styles.flipContainer}>
            <div
              className={styles.profileCard}
              style={{ transform: `rotateY(${y}deg)` }}
            >
              <div
                onMouseEnter={() => this.setState({ rotate: rotate + 20 })}
                onMouseLeave={() => this.setState({ rotate: rotate - 20 })}
                className={styles.profile}
              >
                {this.props.user_info}
                <div
                  className={styles.btnProfile}
                  onClick={() => this.setState({ rotate: rotate + 180 })}
                >
                  <FaPencil />
                </div>
              </div>
              <div className={styles.edit}>
                <div
                  className={styles.btnEdit}
                  onClick={() => this.setState({ rotate: rotate + 180 })}
                >
                  <FaRotateLeft />
                </div>
              </div>
            </div>
          </div>
        )}
      </Motion>
    );
  }
}

export default Profile;
