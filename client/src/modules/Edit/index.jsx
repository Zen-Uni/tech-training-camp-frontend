/**
 * @description markdown 编辑页面父组件，用于挂载页面布局组件
 * @author Uni
 */

import React, { useState } from 'react'


// import style components
import {
    EditWrapper,
    EditHeaderWrapper,
    EditToolWrapper,
    EditContentWrapper,
    ContentLeftWrapper,
    ContentRightWrapper,
    ContentFooter,
} from './style'

// import subcomponents
import EditLeft from './EditLeft'

function Edit() {

    const [editFocus, setEditFocus] = useState(false)



    return (
        <EditWrapper>
            {/* 顶部组件，挂载文章标题组件、头像组件、发布按钮组件 */}
            <EditHeaderWrapper>
            </EditHeaderWrapper>

            {/* markdown 快捷工具栏组件 */}
            <EditToolWrapper>    
            </EditToolWrapper>

            {/* markdown 内容区容器 */}
            <EditContentWrapper>

                {/* 左侧 */}
                <ContentLeftWrapper className={ editFocus ? 'handle_focus' : '' }>

                    <EditLeft editFocus={editFocus}/>

                    <ContentFooter className="footer-left">
                        <div className="footer-button footer-button-left" onClick={() => setEditFocus((editFocus) => !editFocus)}>专注模式</div>
                    </ContentFooter>
                </ContentLeftWrapper>

                {/* 右侧 */}
                <ContentRightWrapper>
                    <ContentFooter className="footer-right">
                        <div className="footer-button footer-button-right">预览模式</div>
                    </ContentFooter>
                </ContentRightWrapper>

            </EditContentWrapper>

        </EditWrapper>
    )
}

export default Edit