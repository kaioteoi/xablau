import KEYS from './constants';

const saveLocation = (location) => {
    localStorage.setItem(KEYS.LOCATION_KEY, location)
};

const getLocation = () => localStorage.getItem(KEYS.LOCATION_KEY);

const saveDistance = (distance) => {
    localStorage.setItem(KEYS.DISTANCE_KEY, distance)
};

const getDistance = () => localStorage.getItem(KEYS.DISTANCE_KEY);

const hasKeys = () => {
    return Object.values(KEYS).every(key => localStorage.getItem(key));
};

const buildRequest = () => {
    return {
        'location': getLocation(),
        'distance': getDistance()
    };
};

export {
    buildRequest,
    saveLocation,
    getLocation,
    saveDistance,
    getDistance,
    hasKeys
}