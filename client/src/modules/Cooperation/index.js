/**
 * @description 协作编辑页面
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
 import Left from './Left'
 import Right from './Right'

 
 
 // import toolbar config
 import { toolBarConfig, Tool} from '../../util/tool-bar'
 import { connect } from 'react-redux'
 import { configReq } from '../../util/token'
 import { checkToken, getAvatar, postArticle, root, upDateArticle } from '../../service'
 import { useHistory, useParams } from 'react-router'
 
 
 function Cooperation(props) {
     const history = useHistory()
     const { id } = useParams()
     useEffect(() => {
         configReq()
 
         async function fetchData() {
             const {
                 code,
                 msg,
                 data
             } = await checkToken()
             // console.log(code)
             if (code === 1) {
                 message.warning(data.msg, 1, () => {
                     history.replace('/')
                 })
             } else {
                 const res = await getAvatar()
                 if (res.data.url !== '')
                    document.querySelector('.avatar').style.backgroundImage = `url(${root + res.data.url})`
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
     const [username, setUsername] = useState('')
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
 
  
 
 
     const handlePostArticle = async () => {
   
         const content = document.getElementById('contentEl').innerText
         const payload = {
             username, 
             content,
             id
         }
         
         const { code, msg, data } =  await upDateArticle(payload)
         console.log(msg)
         if (code === 0) {
             message.success(msg, .5, () => {
                 history.replace('/')
             })
         } else {
             message.warning(data.msg)
         }
     }
 
     return (
         <EditWrapper>
             {/* 顶部组件，挂载文章标题组件、头像组件、发布按钮组件 */}
             <EditHeaderWrapper>
                 {/* <HeaderInputWrapper>
                     <input type="text" placeholder="输入文章标题" ref={titleEl}/>
                 </HeaderInputWrapper> */}
                 <HeaderConfigWrapper>
                     
                     <Button className="back-button" onClick={handleBackArticle}>返回主页</Button>
                     <Button type="primary" className="post-button" onClick={handlePostArticle}>更新文章</Button>
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
                     <Left editFocus={editFocus} editContent={getEditContent} setUsername={setUsername}/>
 
                     <ContentFooter className="footer-left">
                         <div className="footer-button footer-button-left" onClick={() => setEditFocus((editFocus) => !editFocus)}>专注模式</div>
                     </ContentFooter>
                 </ContentLeftWrapper>
 
                 {/* 右侧 */}
                 <ContentRightWrapper>
 
                     <Right preview={preview}/>
 
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
 
 export default connect(stateToProps, stateToDispatch)(Cooperation)