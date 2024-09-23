import React from "react";

// Main components
import ImageLoader from "../../components/ImageLoader";
import ControlBar from "../../components/ControlBar";
import InfoDialog from "../../components/InfoDialog/InfoDialog";
import QuickLinks from "../../components/QuickLinks/QuickLinks";
import NewVersionNotification from "../../components/NewVersionNotification/NewVersionNotification";
import WeddingCountdown from "../../components/CountDown/CountDown.jsx";

export default function Home({ setImageLoaded, imageLoaded, imageLoadedRef, country, city, cityId, imageUrl, smallImageUrl, attribution, fact, countryInfo, cityInfo, currentImageFavoriteStatus, setCurrentImageFavoriteStatus }) {
    return (
        <div className="relative modal-inactive">
            {/* <NewVersionNotification /> */}
            <ControlBar
                cityId={cityId}
                hideControls={false}
                currentImageFavoriteStatus={currentImageFavoriteStatus}
                setCurrentImageFavoriteStatus={setCurrentImageFavoriteStatus}
                page={'home'}
                countryInfo={countryInfo}
                attribution={attribution}
                city={city}
                country={country}
                setShowAuthModal={() => { }}
            />
            <QuickLinks />
            <InfoDialog city={city} fact={fact} country={country} attribution={attribution} countryInfo={countryInfo} cityInfo={cityInfo} />
            <WeddingCountdown />
            <div id="canvaContainer">
                <ImageLoader
                    alt="Unsplash image"
                    country={country}
                    city={city}
                    smallImageUrl={smallImageUrl}
                    setImageLoaded={setImageLoaded}
                    imageLoaded={imageLoaded}
                    imageLoadedRef={imageLoadedRef}
                    imageUrl={imageUrl}
                />
            </div>
        </div>
    )
}