// import action type constant
import {
    EDIT_UPDATE,
    USER_CONFIG
} from './actionConstant'


// import Particle
// import Particle from '../controller/particle'
// import Particle from '../util/Particle'
import Particle from '../util/markdown-particle'

const defaultState = {
    editContent: '',
    username: '',
}

const reducer = (state = defaultState, action) => {

    if (action.type === EDIT_UPDATE) {
        const newState = JSON.parse(JSON.stringify(state))
        const renderValue = new Particle(action.text)
        newState.editContent = renderValue.htmlContent
        return newState
    }
    
    if (action.type === USER_CONFIG) {
        const newState = JSON.parse(JSON.stringify(state))
        
        newState.username = action.username

        return newState
    }

    return state
}

export default reducer