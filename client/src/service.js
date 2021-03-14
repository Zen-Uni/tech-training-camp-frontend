import fetch from './util/fetch'

const rootPath = 'http://127.0.0.1:4000/api'
const axios = fetch(rootPath)

export async function login(data) {
    const res = await axios('post', '/user/login', data)
    return res
}

export async function captcha(data) {
    const res = await axios('post', '/user/captcha', data)
    return res
}

export async function register(data) {
    const res = await axios('post', '/user/register', data) 
    return res
}


export async function checkToken() {
    const res = await axios('get', '/user/token')
    return res
}