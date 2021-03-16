/**
 * @description markdown 编辑页面父组件，用于挂载页面布局组件
 * @author Uni
 */

import React, { useEffect, useState } from 'react'

import {
    editUpdateAction,
} from '../../store/action'


import {
    Button
} from 'antd'

// import style components
import {
    EditWrapper,
    EditHeaderWrapper,
    EditToolWrapper,
    EditContentWrapper,
    ContentLeftWrapper,
    ContentRightWrapper,
    ContentFooter,
    HeaderInputWrapper,
    HeaderConfigWrapper,
} from './style'

// import subcomponents
import EditLeft from './EditLeft'
import EditRight from './EditRight'


// import toolbar config
import { toolBarConfig, Tool} from '../../util/tool-bar'
import { connect } from 'react-redux'


function Edit(props) {

    const { update } = props

    const [editFocus, setEditFocus] = useState(false)
    const [preview, setPreview] = useState(false)
    const [areaStyle, setAreaStyle] = useState('')
    const [editContent, setEditContent] = useState('')
    const [tool, setTool] = useState(new Tool(editContent))
    

    useEffect(() => {
        if (preview === false && editFocus === false) {
            setAreaStyle('')
        }

        if (preview === true) {
            setAreaStyle('handle_preview')
        }

        if (editFocus === true) {
            setAreaStyle('handle_focus')
        }
    }, [preview, editFocus])


    const getEditContent = (text) => {
        setEditContent(text)
    }

    useEffect(() => {
        setTool(new Tool(editContent))
    }, [editContent])

    const handleUpDateEdit = () => {
        const input = document.getElementById('contentEl')
        update(input.innerHTML)
    }

    return (
        <EditWrapper>
            {/* 顶部组件，挂载文章标题组件、头像组件、发布按钮组件 */}
            <EditHeaderWrapper>
                <HeaderInputWrapper>
                    <input type="text" placeholder="输入文章标题"/>
                </HeaderInputWrapper>
                <HeaderConfigWrapper>
                    <Button type="primary" className="post-button">发布文章</Button>
                    <div className="avatar"></div>
                </HeaderConfigWrapper>
            </EditHeaderWrapper>

            {/* markdown 快捷工具栏组件 */}
            <EditToolWrapper>    
               {
                   toolBarConfig.map((item) => {
                       return <div className={"iconfont " + item.icon} onMouseDown={tool[item.fn]} onClick={handleUpDateEdit}></div>
                   })
               }
            </EditToolWrapper>

            {/* markdown 内容区容器 */}
            <EditContentWrapper>

                {/* 左侧 */}
                <ContentLeftWrapper className={ areaStyle } >

                    {/* 编辑组件 */}
                    <EditLeft editFocus={editFocus} editContent={getEditContent}/>

                    <ContentFooter className="footer-left">
                        <div className="footer-button footer-button-left" onClick={() => setEditFocus((editFocus) => !editFocus)}>专注模式</div>
                    </ContentFooter>
                </ContentLeftWrapper>

                {/* 右侧 */}
                <ContentRightWrapper>

                    <EditRight preview={preview}/>

                    <ContentFooter className="footer-right">
                        <div className="footer-button footer-button-right" onClick={() => setPreview((preview) => !preview)}>预览模式</div>
                    </ContentFooter>
                </ContentRightWrapper>

            </EditContentWrapper>

        </EditWrapper>
    )
}


const stateToDispatch = dispatch => {
    return {
        update(text) {
            const action = editUpdateAction(text)
            dispatch(action)
        }
    }
}

export default connect(null, stateToDispatch)(Edit)