import { Button } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'

import {
    LeftWrapper
} from './style'

function Left(props) {

    const { slide, auth } = props

    const history = useHistory()

    const goToEdit = () => {
        history.replace('/edit')
    }

    return (
        <LeftWrapper className={slide ? "slide_show" : "slide_hidden"}>
            <Button className="login-button">
                {
                    auth ? "退出登录" : "去登陆"
                }
            </Button>
            <div className="edit-button" onClick={goToEdit}>写文章</div>
        </LeftWrapper>
    )
}

export default Left