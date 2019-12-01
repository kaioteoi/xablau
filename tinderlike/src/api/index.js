import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND || 'http://localhost:8000';

export default axios.create({ baseURL });
