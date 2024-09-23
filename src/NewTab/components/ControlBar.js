import React from 'react';
import request from '../utils/request';
import trackClick from '../utils/trackClick';
import trackStat from '../utils/trackStat';

// Hooks
import { useAuth } from '../hooks/useAuth';

// Components
import FavoriteControl from '../shared/likeIcon';
import ShareIcon from '../shared/shareIcon';

// Styling
import './controlBar.scss';

const ControlBar = ({
  hideControls,
  cityId,
  currentImageFavoriteStatus,
  setCurrentImageFavoriteStatus,
  page,
  setShowAuthModal,
  city,
  country,
  countryInfo,
  attribution,
}) => {
  // Hooks
  const { user } = useAuth();

  const toggleFavorite = () => {
    if (!user.isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    if (currentImageFavoriteStatus) {
      trackClick('unfavorite');
      trackStat({ type: 'general', property: 'unfavorites' });
      setCurrentImageFavoriteStatus(false);
      request(`/favorites/city/${cityId}`, {
        method: 'DELETE',
        body: {},
      }).then((response) => {
        if (response.message) {
          // TODO: show error message snackbar
          setCurrentImageFavoriteStatus(true);
        }
      });
    } else {
      trackClick('favorite');
      trackStat({ type: 'general', property: 'favorites' });
      setCurrentImageFavoriteStatus(true);
      request(`/favorites`, {
        method: 'POST',
        body: {
          city: cityId,
        },
      }).then((response) => {
        if (response.message) {
          // TODO: show error message snackbar
          setCurrentImageFavoriteStatus(false);
        }
      });
    }
  };

  return (
    <div className="controlBar" style={{ zIndex: 999 }}>
      {!hideControls && (
        <div className="flex controlBar-right">
          {cityId && page === 'home' && (
            <FavoriteControl
              toggleFavorite={toggleFavorite}
              currentImageFavoriteStatus={currentImageFavoriteStatus}
              showBackground={true}
            />
          )}
          {/* {page === 'home' && (
            <ShareIcon
              city={city}
              country={country}
              countryInfo={countryInfo}
              attribution={attribution}
            />
          )} */}
        </div>
      )}
    </div>
  );
};

export default ControlBar;
