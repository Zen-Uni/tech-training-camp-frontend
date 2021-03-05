/**
 * @description 右侧 HTML 渲染区域父组件
 * @author Uni
 */

import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'

// import style components
import {
    EditRender,
} from './style'

function EditRight(props) {

    const { preview, content } = props

    const renderEl = useRef(null)

    useEffect(() => {
        renderEl.current.innerHTML = content === "" ? null : content
    })

    return (
        <EditRender className={preview ? 'content-preview' : ''} ref={renderEl}> 
            {/* {
                content === '' 
                ? 
                null 
                :  
                content.map(item => {
                    return <div>{item}</div>
                })
            } */}
        </EditRender>
    )
}

const stateToProps = state => {
    return {
        content: state.editContent
    }
}


export default connect(stateToProps, null)(EditRight)