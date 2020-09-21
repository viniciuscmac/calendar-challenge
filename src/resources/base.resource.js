import axios from 'axios';

class BaseResource {
  Get(url) {
    const promise = axios.get(url).then(
      (response) => response,
    ).catch((error) => error);
    return promise;
  }
}

export default BaseResource;
