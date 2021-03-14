
import axios from 'axios'
import {
    SuccessModel,
    ErrorModel
} from './message'

const site = "BYTEDANCE_LCH"

export const storeToken = token => {
    window.localStorage.setItem(site, token)
}

export const getToken = () => {
    return window.localStorage.getItem(site)
}

export const configReq = () => {
    const token = getToken()
    if (token) {
        axios.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${token}`
            return config
        })
        
    } 
}