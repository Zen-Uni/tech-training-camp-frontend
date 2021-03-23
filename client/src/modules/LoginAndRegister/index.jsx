/**
 * @description 文章登录注册页面
 * @author Uni
 */

import React, { useEffect, useState } from 'react'

// import util
import {
    configReq,
    storeToken,
} from '../../util/token'



// import style components
import {
    SignWrappper,
} from './style'


// import subcomponents
import Login from './Login'
import Register from './Register'
import { useHistory } from 'react-router'
import {
    checkToken
} from '../../service'
import { connect } from 'react-redux'
import { updateUserConfig } from '../../store/action'
import { message } from 'antd'

function LoginAndRegister(props) {

    const { storeUsername } = props

    const history = useHistory()

    useEffect(() => {        
        configReq()
        
        async function fetchData() {
            const {
                code,
                data,
                msg
            } = await checkToken()
            if (code === 0) {
                storeUsername(data.username)
                history.replace('/')
            }
        }

        fetchData()

        return () => {
            message.success('已登录')
        }
    }, [])

    const [login, setLogin] = useState(true)


    const handleChangeComponents = () => {
        setLogin(() => {
            return !login
        })
    }

    return (
        <SignWrappper>
            {
                login ? <Login handleChange={handleChangeComponents}/> : <Register handleChange={handleChangeComponents}/>
            }
        </SignWrappper>
    )
}

const stateToDispatch = dispatch => {
    return {
        storeUsername(username){
            const action = updateUserConfig(username)
            dispatch(action)
        }
    }
}

export default connect(null, stateToDispatch)(LoginAndRegister)