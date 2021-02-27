// import action type constant
import {
    EDIT_UPDATE
} from './actionConstant'

export const editUpdateAction = text => {
    return {
        type: EDIT_UPDATE,
        text,
    }
}