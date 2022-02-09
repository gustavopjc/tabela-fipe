import axios from 'axios';

const BaseService = {
    init(baseURL) {
        axios.defaults.baseURL = baseURL
    },
    get(url, config) {
        return axios.get(url, config).then((response) => response.data)
    },
}

export default BaseService