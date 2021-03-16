// import action type constant
import {
    EDIT_UPDATE,
    USER_CONFIG,
} from './actionConstant'

export const editUpdateAction = text => {
    return {
        type: EDIT_UPDATE,
        text,
    }
}

export const updateUserConfig = username => {
    return {
        type: USER_CONFIG,
        username
    }
}

