import request from './request';

const trackStat = ({ type, property }) => {
    if (process.env.REACT_APP_NODE_ENV === "production") {
        request(`/stats`, {
            method: 'POST',
            body: {
                type,
                property
            }
        })
    }
}

export default trackStat;