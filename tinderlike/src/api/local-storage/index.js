import KEYS, {IDENTIFIER_KEY} from './constants';

const saveLocation = (location) => {
    localStorage.setItem(KEYS.LOCATION_KEY, location)
};

const getLocation = () => localStorage.getItem(KEYS.LOCATION_KEY);

const saveDistance = (distance) => {
    localStorage.setItem(KEYS.DISTANCE_KEY, distance)
};

const saveKids = (kids) => {
    localStorage.setItem(KEYS.KIDS_KEY, kids)
};

const saveRoom = (room) => {
    localStorage.setItem(KEYS.ROOM_KEY, room)
};

const saveTransport = (transport) => {
    localStorage.setItem(KEYS.TRANSPORT_KEY, transport)
};

const saveOrderRoom = (orderRoom) => {
    localStorage.setItem(KEYS.ORDER_ROOM_KEY, orderRoom)
};

const saveIdentifier = (identifier) => {
    localStorage.setItem(IDENTIFIER_KEY, identifier)
};

const getKids = () => localStorage.getItem(KEYS.KIDS_KEY);

const getRoom = () => localStorage.getItem(KEYS.ROOM_KEY);

const getTransport = () => localStorage.getItem(KEYS.TRANSPORT_KEY);

const getOrderRoom = () => localStorage.getItem(KEYS.ORDER_ROOM_KEY);

const getDistance = () => localStorage.getItem(KEYS.DISTANCE_KEY);

const getIdentifier = () => localStorage.getItem(IDENTIFIER_KEY);

const hasKeys = () => {
    return Object.values(KEYS).every(key => localStorage.getItem(key));
};

const buildRequest = () => {
    return {
        'location': getLocation(),
        'distance': getDistance(),
        'kids': getKids(),
        'room': getRoom(),
        'transport': getTransport(),
        'orderRoom': getOrderRoom()
    };
};

export {
    buildRequest,
    saveLocation,
    getLocation,
    saveDistance,
    getDistance,
    saveKids,
    getKids,
    saveRoom,
    getRoom,
    saveTransport,
    getTransport,
    saveOrderRoom,
    getOrderRoom,
    saveIdentifier,
    getIdentifier,
    hasKeys
}