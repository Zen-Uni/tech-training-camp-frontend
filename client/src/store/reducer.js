// import action type constant
import {
    EDIT_UPDATE,
} from './actionConstant'


// import Particle
// import Particle from '../controller/particle'
// import Particle from '../util/Particle'
import Particle from '../util/markdown-particle'

const defaultState = {
    editContent: ''
}

const reducer = (state = defaultState, action) => {

    if (action.type === EDIT_UPDATE) {
        const newState = JSON.parse(JSON.stringify(state))
        const renderValue = new Particle(action.text)
        console.log('renderValue------', renderValue)
        newState.editContent = renderValue.htmlContent
        return newState
    }
    

    return state
}

export default reducer