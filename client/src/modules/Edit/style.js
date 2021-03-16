import styled from 'styled-components'
import avatar from '../../static/avatar.jpg'
console.log(avatar)
export const EditWrapper = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    /* background-color: black; */
    overflow: hidden;
    box-sizing: border-box;
    min-width: 1000px;
`
// Header 组件样式
export const EditHeaderWrapper = styled.div`
    position: relative;
    height: 60px;
    width: 100%;
    /* background-color: pink; */
    display: flex;
    align-items: center;
`

export const HeaderInputWrapper = styled.div`
    height: 50px;
    width: 500px;
    /* background-color: yellow; */
    position: absolute;
    left: 50px;
    /* border-bottom: 2px solid #ccc; */

    & input {
        position: relative;
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        font-size: 30px;
        &::placeholder {
            color: #ccc;
        }
    }
`
export const HeaderConfigWrapper = styled.div`
    height: 50px;
    width: 150px;
    position: absolute;
    right : 50px;
    /* background-color: pink; */
    display: flex;
    align-items: center;
    & .post-button {
        height: 40px;
        border-radius: 5px;
    }

    & .avatar {
        position: absolute;
        right: 0px;
        height: 40px;
        width: 40px;
        border-radius: 20px;
        background-position: center center;
        background-repeat: none;
        background-image: url(${avatar});
        background-size: cover;
    }
`

// 快捷工具栏组件
export const EditToolWrapper = styled.div`
    position: relative;
    height: 40px;
    width: 100%;
    background-color: yellow;
    display: flex;
    align-items: center;
    
`

export const EditContentWrapper = styled.div`
    position: absolute;
    top: 100px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
    background: #ccc;
`

// 左侧编辑区容器
export const ContentLeftWrapper = styled.div`
    position: relative;
    height: 100%;
    width: 50%;
    background-color: #f8f8f8;
    float: left;
    overflow: hidden;
    transition: all .4s ease;
    border-right: 2px solid #ccc;
    &.handle_focus {
        width: 100% !important;
    }

    &.handle_preview {
        width: 0%;
    }
`

// 右侧内容渲染区容器
export const ContentRightWrapper = styled.div`
    position: relative;
    height: 100%;
    background-color: white;
    overflow: hidden;
`


export const ContentFooter = styled.div`
    position: absolute;
    height: 30px;
    width: 100%;
    bottom: 0px;
    background-color: white;
    border-top: 1px solid #ddd;

    /* &.footer-left {
        border-right: 1px solid #ddd;
    }

    &.footer-right {
        border-left: 1px solid #ddd;
    } */

    & .footer-button {
        height: 100%;
        width: 80px;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        cursor: pointer;
    }

    & .footer-button-left {
        position: absolute;
        right: 10px;
    }

    & .footer-button-right {
        position: absolute;
        left: 10px;
    }
`

// markdown edit components style
export const EditContent = styled.div`
    position: absolute;
    top: 0;
    bottom: 30px;
    left: 0px;
    right: 0px;
    margin: auto;
    /* background-color: pink; */
    /* overflow-y: scroll; */
    outline: none;
    box-sizing: border-box;
    overflow-x: hidden;
    padding: 10px 20px;
    transition: padding .4s ease;
    &.content-focus {
        padding: 30px 40px;
        /* text-align: center; */
    }



    &::-webkit-scrollbar {
        width: 7px;
    }

    &::-webkit-scrollbar-thumb {
        width: 7px;
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
        background: rgba(0,0,0,0.1);
        /* scrollbar-arrow-color:red; */
    }

    &::-webkit-scrollbar-track {    /*滚动条里面轨道*/
       
        /* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
        border-radius: 0;
        background: #eee;
    }
`

// TODO: 优化，抽离出一个公共的样式组件
// markdown render components style
export const EditRender = styled.div`
    position: absolute;
    top: 0;
    bottom: 30px;
    left: 0px;
    right: 0px;
    margin: auto;
    outline: none;
    box-sizing: border-box;
    overflow-x: hidden;
    padding: 10px 20px;
    transition: padding .4s ease;
    word-wrap: break-word;


    &.content-preview {
        padding: 30px 40px;
        /* text-align: center; */
    }

    &::-webkit-scrollbar {
        width: 7px;
    }

    &::-webkit-scrollbar-thumb {
        width: 7px;
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
        background: rgba(0,0,0,0.1);

    }

    &::-webkit-scrollbar-track {    
        border-radius: 0;
        background: #eee;
    }
`
