/**
 * @description markdown 编辑页面父组件，用于挂载页面布局组件
 * @author Uni
 */

import React, { useEffect, useRef, useState } from 'react'

import {
    editUpdateAction,
} from '../../store/action'


import {
    Button, message
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
import ShareButton from './ShareButton'


// import toolbar config
import { toolBarConfig, Tool} from '../../util/tool-bar'
import { connect } from 'react-redux'
import { configReq } from '../../util/token'
import { checkToken, postArticle } from '../../service'
import { useHistory } from 'react-router'


function Edit(props) {
    const history = useHistory()
    useEffect(() => {
        configReq()

        async function fetchData() {
            const {
                code,
                msg
            } = await checkToken()
            // console.log(code)
            if (code === 1) {
                message.warning(msg, 1, () => {
                    history.replace('/')
                })
            }
        }

        fetchData()
    }, [])

    const { update, User } = props

    const [editFocus, setEditFocus] = useState(false)
    const [preview, setPreview] = useState(false)
    const [areaStyle, setAreaStyle] = useState('')
    const [editContent, setEditContent] = useState('')
    const [tool, setTool] = useState(new Tool(editContent))
    const [share, setShare] = useState(false)
    const titleEl = useRef(null)

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

    const handleBackArticle = () => {
        history.replace('/')
    }

    const handleShare = () => {
        setShare((share) => !share)
    }


    const handlePostArticle = async () => {
        const title = titleEl.current.value
        const content = document.getElementById('contentEl').innerText
        console.log(content)
        if (!title && !content) {
            return message.warning("请填写标题或内容")
        }

        const username = User
        const payload = {
            title,
            username, 
            content,
            share
        }
        
        const { code, msg } = await postArticle(payload)
        if (code === 0) {
            message.success(msg, .5, () => {
                history.replace('/')
            })
        } else {
            message.warning(msg)
        }
    }

    return (
        <EditWrapper>
            {/* 顶部组件，挂载文章标题组件、头像组件、发布按钮组件 */}
            <EditHeaderWrapper>
                <HeaderInputWrapper>
                    <input type="text" placeholder="输入文章标题" ref={titleEl}/>
                </HeaderInputWrapper>
                <HeaderConfigWrapper>
                    <ShareButton handleShare={handleShare} share={share}/>
                    <Button className="back-button" onClick={handleBackArticle}>返回主页</Button>
                    <Button type="primary" className="post-button" onClick={handlePostArticle}>发布文章</Button>
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


const stateToProps = state => {
    return {
        User: state.username
    }
}

const stateToDispatch = dispatch => {
    return {
        update(text) {
            const action = editUpdateAction(text)
            dispatch(action)
        }
    }
}

export default connect(stateToProps, stateToDispatch)(Edit)