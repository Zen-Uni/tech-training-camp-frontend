import { message } from 'antd'
import React, { useEffect } from 'react'

import { ShareButtonWrapper} from './style'

function ShareButton(props) {

    const { share, handleShare } = props

    useEffect(() => {
        if (share) {
            message.success('文章共享开启', 1)
        } else {
            message.success('文章共享关闭', 1)
        }
    }, [share])

    return (
        <ShareButtonWrapper>
            <div className="button-label">共享文章:</div>
            <div className={"button-background " + (share ? "button-background_share" : "button-background_unshare")} onClick={handleShare}>
                <div className={"button-ball " + (share ? "button-ball_share" : "button-ball_unshare")}></div>
            </div>
        </ShareButtonWrapper>
    )
}

export default ShareButton