import axios from 'axios';

const instance = axios.create({
      baseURL: 'https://myburger-react-app-1aa2d.firebaseio.com/'
});

export default instance;