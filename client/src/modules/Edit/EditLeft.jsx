/**
 * @description markdown 编辑区域
 * @author Uni
 */

import React, { useRef } from 'react'

// import components style
import {
    EditContent,
} from './style'

function EditLeft(props) {
    
    const { editFocus } = props

    const contentEl = useRef(null)

    

    const handleEdit = e => {
        // TODO: 通过 redux 存储输入文本

        console.log(contentEl.current.innerText)
        if (e.keyCode === 9) {
            e.preventDefault()


            // TODO: 写一篇技术博客记录一下
            // 获取光标的range对象 event.view 是一个window对象
            let range = e.view.getSelection().getRangeAt(0);
            // 光标的偏移位置
            let offset = range.startOffset;
            // 新建一个span元素
            let span = document.createElement('span');
            // 四个 表示四个空格
            span.innerHTML = '    ';
            // 创建一个新的range对象
            let newrange = document.createRange();
            // 设置新的range的位置，也是插入元素的位置
            newrange.setStart(range.startContainer, offset);
            newrange.setEnd(range.startContainer, offset);
            newrange.collapse(true);
            newrange.insertNode(span);
            // 去掉旧的range对象，用新的range对象替换
            e.view.getSelection().removeAllRanges();
            e.view.getSelection().addRange(range);
            // 将光标的位置向后移动一个偏移量，放到加入的四个空格后面
            range.setStart(span, 1);
            range.setEnd(span, 1);
        }
    }   

    return (
        <EditContent contentEditable="true" className={editFocus ? "content-focus" : ''} onKeyDown={handleEdit} ref={contentEl} id="contentEl"> 
        </EditContent>
    )
}

export default EditLeft



