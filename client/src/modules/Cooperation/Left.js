/**
 * @description markdown 编辑区域
 * @author Uni
 */

 import React, { useEffect, useRef, useState } from 'react'
 import { connect } from 'react-redux'
import { useParams } from 'react-router'
import { getDetails } from '../../service'
 
 
 // import action function
 import {
     editUpdateAction,
 } from '../../store/action'
 
 // import components style
 import {
     EditContent,
 } from './style'
 
 function Left(props) {
     
     const { setUsername } = props

     const { editFocus, updateEdit, editContent } = props
     const { id } = useParams()
     const contentEl = useRef(null)
     
     useEffect(() => {
        const fetchData = async () => {
            const res = await getDetails(id)
            console.log(res)
            const { username, content } = res.data
            console.log(username, content)
            setUsername(username)
            contentEl.current.innerText = content
            updateEdit(content)
        }

        fetchData()
     }, [])
 
     const handleEdit = e => {
         let text = contentEl.current.innerText
         // console.log(contentEl.current.innerText)
         // console.log(e.keyCode)
         if (e.keyCode === 9) {
             e.preventDefault()
 
            
 
             // 获取光标的range对象 event.view 是一个window对象
             let range = e.view.getSelection().getRangeAt(0);
             // 光标的偏移位置
             let offset = range.startOffset;
             // 新建一个span元素
             let span = document.createElement('span');
             // 四个 表示四个空格
             span.innerHTML = '&nbsp;&nbsp;&nbsp;';
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
             console.log(text)
             
         }
         
         // console.log(text.split('\n'))
         editContent(text)
         updateEdit(text)
     }   
 
     const handleBeforeEdit = e => {
         if (e.keyCode === 9) {
             e.preventDefault()
         }
     }
 
     return (
         <EditContent contentEditable="true" className={editFocus ? "content-focus" : ''} onKeyUp={handleEdit} onKeyDown={handleBeforeEdit}  ref={contentEl} id="contentEl"> 
         </EditContent>
     )
 }
 
 // TODO: 通过 redux 存储输入文本
 const stateToDispatch = dispatch => {
     return {
         updateEdit(text) {
             const action = editUpdateAction(text)
             dispatch(action)
         }
     }
 }
 
 
 export default connect(null, stateToDispatch)(Left)
 
 // {
 //      // TODO: 写一篇技术博客记录一下
 //             // 获取光标的range对象 event.view 是一个window对象
 //             let range = e.view.getSelection().getRangeAt(0);
 //             // 光标的偏移位置
 //             let offset = range.startOffset;
 //             // 新建一个span元素
 //             let span = document.createElement('span');
 //             // 四个 表示四个空格
 //             span.innerHTML = '&nbsp;&nbsp;&nbsp;';
 //             // 创建一个新的range对象
 //             let newrange = document.createRange();
 //             // 设置新的range的位置，也是插入元素的位置
 //             newrange.setStart(range.startContainer, offset);
 //             newrange.setEnd(range.startContainer, offset);
 //             newrange.collapse(true);
 //             newrange.insertNode(span);
 //             // 去掉旧的range对象，用新的range对象替换
 //             e.view.getSelection().removeAllRanges();
 //             e.view.getSelection().addRange(range);
 //             // 将光标的位置向后移动一个偏移量，放到加入的四个空格后面
 //             range.setStart(span, 1);
 //             range.setEnd(span, 1);
 //             console.log(text)
 // }
 
 