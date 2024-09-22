import React, { useContext } from "react";

// Components
import Dialog from "../Dialog";
import TextH5 from "../Text/TextH5";
import TextP from "../Text/TextP";

// Context
import { themeContext } from '../../context/ThemeProvider';

function InfoDialog({ city, country, attribution, fact, countryInfo, cityInfo }) {
    // Context
    const [theme] = useContext(themeContext);

    const continentKeys = {
        "AS": "Asia",
        "EU": "Europe",
        "NA": "North America",
        "SA": "South America",
        "AF": "Africa",
        "AU": "Australia",
        "AN": "Antarctica",
    }
  
  return (
    <Dialog
        modalId="infodialog"
        theme={theme}
        title={`${city ? city : country}${city ? `, ${country}${countryInfo?.emoji ? ` ${countryInfo?.emoji}` : ''}` : null}`}
        body={
            <div>
                {
                    countryInfo && <div className="">
                        <TextH5 classes="text-lg mt-1 mb-0 text-white">Capital: {countryInfo?.capital}</TextH5>
                        {
                            continentKeys[countryInfo?.continent] && <TextH5 classes="text-lg mt-1 mb-0 text-white">Continent: {continentKeys[countryInfo?.continent]}</TextH5>
                        }
                    </div>
                }
                {
                    cityInfo && <div className="">
                        <TextH5 classes="text-lg mt-1 mb-0 text-white">Region: {cityInfo?.region}</TextH5>
                        <TextH5 classes="text-lg mt-1 mb-0 text-white">City Population: {cityInfo?.population?.toLocaleString("en-US")}</TextH5>
                        <TextH5 classes="text-lg mt-1 mb-0 text-white">Nomad Cost of Living: ${cityInfo?.cost_for_nomad_in_usd?.toLocaleString("en-US")}</TextH5>
                        {
                            cityInfo?.top_sights?.length > 0 && 
                                <div>
                                    <TextH5 classes="text-lg mt-1 mb-0 text-white">Sights to see:</TextH5>
                                    <div className="flex flex-wrap text-white">
                                        {
                                            cityInfo?.top_sights.map((sight, index) => {
                                                return <p className="text-white px-5 py-2 mx-1 my-1 text-sm dark:text-white bg-slate-800 rounded-xl" key={`sights-to-see-${index}`}>{sight}</p>
                                            })
                                        }
                                    </div>
                                </div>
                            }
                    </div>
                }
                <TextP classes="mt-8 text-white">
                    See{" "}
                    <a
                        href={`${attribution?.originalImageLink}?utm_source=your_app_name&utm_medium=referral `}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-gray-400 dark:text-gray-400"
                    >
                        unsplash image
                    </a>
                    
                    {" "}taken by{" "}
                    <a
                        href={`${attribution?.image_author_link}?utm_source=your_app_name&utm_medium=referral`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-gray-400 dark:text-gray-400"
                    >
                        {attribution?.image_author_name}
                    </a>{" "}
                    on{" "}
                    <a
                        href="https://unsplash.com?utm_source=your_app_name&utm_medium=referral "
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-gray-400 dark:text-gray-400"
                    >
                        Unsplash
                    </a>
                </TextP>
            </div>
        }
    />
  );
}

export default InfoDialog;
