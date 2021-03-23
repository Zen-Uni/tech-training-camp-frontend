/**
 * @description 首页左侧组件(登录、写文章、退出登录)
 * @author Uni
 */

import { Button } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'
import { configReq, removeToken } from '../../util/token'

import {
    LeftWrapper
} from './style'

function Left(props) {

    const { slide, auth, setAuth } = props

    const history = useHistory()

    const goToEdit = () => {
        history.replace('/edit')
    }

    const handleUser = () => {
        if (auth) {
            removeToken()
            configReq()
            window.location.href = "/"
            
        } else {
            history.replace('/sign')
        }
    }

    return (
        <LeftWrapper className={slide ? "slide_show" : "slide_hidden"}>
            <Button className="login-button" onClick={handleUser}>
                {
                    auth ? "退出登录" : "去登陆"
                }
            </Button>
            <div className="edit-button" onClick={goToEdit}>写文章</div>
        </LeftWrapper>
    )
}

export default Left