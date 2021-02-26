/**
 * @description 右侧 HTML 渲染区域父组件
 * @author Uni
 */

import React from 'react'

// import style components
import {
    EditRender,
} from './style'

function EditRight(props) {

    const { preview } = props

    return (
        <EditRender className={preview ? 'content-preview' : ''}>
        </EditRender>
    )
}

export default EditRight