/**
 * @description 首页样式
 * @author Uni
 */

import styled from 'styled-components'


import avatar from '../../static/avatar.jpg'

export const Container = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
`

export const LeftWrapper = styled.div`
    position: relative;
    height: 100%;
    background-color: black;
    overflow: hidden;
    float: left;
    transition: all .4s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &.slide_show {
        width: 200px;
    }

    &.slide_hidden {
        width: 0px;
    }

    & .login-button {
        background-color: black;
        border: none;
        color: #61dafb;
        font-weight: 600;
    }
    & .login-button:hover{
        background-color: #61dafb;
        color: white;
    }

    & .edit-button {
        color: #61dafb;
        margin: 20px;
        font-size: 12px;
        cursor: pointer;
        width: 200px;
        text-align: center;
    }
`

export const LeftButton = styled.div`
    position: fixed;
    top: 20px;
    left: 30px;
    height: 30px;
    width: 30px;
    background-color: black;
    z-index: 10;
    cursor: pointer;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .6);

    &.slide_show .button-line{
        background-color: #61dafb;
    }

    &.slide_hidden .button-line {
        background-color: white;
    }

    & .button-line {
        height: 2px; 
        width: 20px;
        
        transition: all .4 ease;
        position: absolute;
        left: 5px;
        transition: all .4s ease
    }

    & #button-top {
        top: 6px;
    }
    & #button-middle {
        top: 14px;
    }
    & #button-bottom {
        top: 22px;
    }
`

export const RightWrapper = styled.div`
    height: 100%;
    position: relative;
    overflow: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 3px;
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


// 右侧文章展示区域
export const RightContainer = styled.div`
    height: 100%;
    position: relative;
    margin: 30px auto;
    width: 700px;
    background-color: white;
`

export const RightAvatar = styled.div`
    position: relative;
    margin: 40px auto;
    height: 80px;
    width: 80px;
    border-radius: 40px;
    background-image: url(${avatar});
    background-position: center;
    background-size: cover;
    background-repeat: none;
    overflow: hidden;
    border: 1px #f8f8f8 solid;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, .4);
    
    /* 头像阴影层 */
    & input{
        position: absolute;
        height: 100%;
        width: 100%;
        opacity: 0;
        z-index: -1;
    }

    & .avatar-shadow {
        position: absolute;
        height: 100%;
        width: 100%;
        transition: all .3s ease;  
        cursor: pointer;
    }

    & .avatar-shadow:hover {
        background-color: rgba(0, 0, 0, .4);
    }

    & label div {
        position: absolute;
        bottom: 25px;
        color: rgba(255, 255, 255, 0);
        text-align: center;
        width: 100%;
        transition: all .3s ease;
    }
    & label:hover div {
        color: rgba(255, 255, 255, .7);

    }
`

export const RightContent = styled.div`
    position: relative;
    height: 10px;
    width: 100%;
    /* background-color: black; */
`

export const RightItem = styled.div`
    position: relative;
    height: 100px;
    width: 100%;
    /* background-color: black; */
    /* border: 1px solid black; */
    margin: 20px auto;

    & .title {
        margin: 10px 0px;
        font-size: 27px;
        color: #6f9fc7;
        cursor: pointer;
        transition: all .3s ease;
        text-align: center;
    }
    & .title:hover {
        color: skyblue;
    }

    & .article-config {
        height: 20px;
        width: 100%;
        /* background-color: black; */
        font-size: 10px;
        text-align: center;
        font-weight: 600;


        & span {
            background-color: #4fc08d;
            font-weight: 600;
            font-size: 9px;
            color: whitesmoke;
            margin: 0px 5px;
            display: inline-block;
        }
    }
    
`