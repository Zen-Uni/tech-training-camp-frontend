/**
 * @description 文章内容页面样式
 * @author Uni
 */

import styled from 'styled-components'

export const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    /* background-color: pink; */
    min-width: 1000px;

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

    & .back {
        position:fixed;
        top: 30px;
        left: 50px;
    }
`

export const ArticleBox = styled.div`
    position: relative;
    /* height: 100%; */
    width: 70%;
    background-color: white;
    margin: 0px auto;

    

    & .title {
        position: relative;
        height: 80px;
        width: 100%;
        text-align: center;
        font-size: 50px;
        color: #6f9fc7;
        margin: 20px 0px 5px 0px;
    }
    
    & .share {
        display: flex;
        justify-content: center;
    }

    & .content {
        margin: 50px 0px;

        & blockquote {
            background-color: #f3f3f3;
            border-radius: 5px;
            box-sizing: border-box;
            padding: 20px 0px 15px 30px;
            display: block;
        }

        & hr {
            width: 100%;
            height: 2px;
            background-color: #f4f4f4;
            border: none;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        & .code {
            background-color: yellow;
        }

        & .code-block {
            background-color: rgba(0,0,0,0.8);
            margin: auto;
            width: 80%;
            line-height: 40px;
            padding: 20px 20px 10px 20px;
            border-radius: 5px;
            font-family: "STHeiti";
            color: white;
        }
    }
`