import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { checkToken } from '../../service'
import { updateUserConfig } from '../../store/action'
import { configReq } from '../../util/token'

// import subcomponents
import Left from './Left'
import Right from './Right'

import {
    Container,
    LeftButton,
} from './style'

function Article(props) {

    const { storeUser } = props

    const [slide, setSlide] = useState(false) 
    const [auth, setAuth] = useState(false)

    const handleSlide = () => {
        setSlide((slide) => !slide)
    }

    useEffect(() => {
        configReq()
        async function fetchData() {
            const { code, data } = await checkToken()
            const username = data.username
            if (code === 0) {
                console.log(username)
                storeUser(username)
                setAuth(true)
            } else {
                setAuth(false)
            }
        }

        fetchData()
    }, [])

    return (
        <Container>
            <LeftButton onClick={handleSlide} className={slide ? "slide_show" : "slide_hidden"}>
                <div className="button-line" id="button-top"></div>
                <div className="button-line" id="button-middle"></div>
                <div className="button-line" id="button-bottom"></div>
            </LeftButton>
            <Left slide={slide} auth={auth}/>
            <Right/>
        </Container>
    )
}

const stateToDispatch = dispatch => {
    return {
        storeUser(username) {
            const action = updateUserConfig(username)
            dispatch(action)
        }
    }
}

export default connect(null, stateToDispatch)(Article)