/**
 * @description 网络请求模块
 * @author Uni
 */

import fetch from './util/fetch'

// const rootPath = 'http://60.205.230.224:4000/api'

export const root = "http://60.205.230.224:4000/"

const rootPath = root + "api"


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

export async function postArticle(payload) {
    const res = await axios('post', '/user/post-article', payload)
    return res
}

export async function getArticle() {
    const res = await axios('get', '/user/article-list')
    return res
}

export async function getDetails(id) {
    const res = await axios('post', '/user/article-detail', {id})
    return res
}

export async function upDateArticle(payload) {
    const res = await axios('post', '/user/article-update', payload)
    return res
}

export async function getAvatar() {
    const res = await axios('get', '/user/avatar')
    return res
}


// 上传图片
export async function upLoadImg(data) {
    const res = await axios('post', '/img/avatar', data)
    return res
}

