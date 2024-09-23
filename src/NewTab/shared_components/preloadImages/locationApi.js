import isWebpSupported from './locationApiUtils/isWebpSupported';
import checkIsMobile from './locationApiUtils/isMobile';
import { unsplashImages } from './all_wedding_images';
let webpSupported = false;
const isMobile = checkIsMobile();

const checkIsWebpSupported = async () => {
  webpSupported = await isWebpSupported();
};

checkIsWebpSupported();

const getLocation = async () => {
  // const requestUrl = new URL(`${process.env.REACT_APP_API_URL}/locations`);
  // console.log(requestUrl);
  // const response = await fetch(requestUrl);

  let newLargeImageUrl = undefined;
  let newMediumImageUrl = undefined;
  let newSmallImageUrl = undefined;

  try {
    const randomImage =
      unsplashImages[Math.floor(Math.random() * unsplashImages.length)];
    console.log(randomImage);
    if (webpSupported) {
      if (randomImage.image_url_large?.indexOf('jpeg') !== -1) {
        newLargeImageUrl = randomImage.image_url_large.replace(
          'fm=jpeg',
          'fm=webp'
        );
        newMediumImageUrl = randomImage.image_url_medium.replace(
          'fm=jpeg',
          'fm=webp'
        );
        newSmallImageUrl = randomImage.image_url_small.replace(
          'fm=jpeg',
          'fm=webp'
        );
      } else if (randomImage.image_url_large?.indexOf('jpg') !== -1) {
        newLargeImageUrl = randomImage.image_url_large.replace(
          'fm=jpg',
          'fm=webp'
        );
        newMediumImageUrl = randomImage.image_url_medium.replace(
          'fm=jpg',
          'fm=webp'
        );
        newSmallImageUrl = randomImage.image_url_small.replace(
          'fm=jpg',
          'fm=webp'
        );
      }
    }

    return {
      url: isMobile
        ? newMediumImageUrl || randomImage?.image_url_medium
        : newLargeImageUrl || randomImage?.image_url_large,
      smallUrl: newSmallImageUrl || randomImage?.image_url_small,
      imageLink: null,
      attribution: {
        image_author_username: null,
        image_author_name: null,
        image_author_link: null,
        originalImageLink: null,
      },
      country: randomImage?.country,
      countryName: randomImage?.country_name,
      city: randomImage?.city?.id,
      cityInfo: randomImage?.city,
      cityName: randomImage?.city_name,
      fact: randomImage?.fact,
      id: randomImage?._id,
    };
  } catch (error) {
    console.error(error);
    return {};
  }
};

export default getLocation;
