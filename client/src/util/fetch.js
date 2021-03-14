import axios from 'axios'

export default function fetch(rootPath) {
    return function(method, path, data) {
        return new Promise((resolve, reject) => {
            if (method === 'get') {
                axios.get(rootPath + path)
                .then(res => {
                    resolve(res.data)
                })
            }

            if (method === 'post') {
                axios.post(rootPath + path, data)
                .then(res => {
                    resolve(res.data)
                })
            }
        })
    }
}