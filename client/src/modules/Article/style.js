import styled from 'styled-components'


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

export const RightContainer = styled.div`
    height: 100%;
    position: relative;
    margin: 30px auto;
    width: 700px;
    background-color: white;
    
`