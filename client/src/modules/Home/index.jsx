import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'

import { checkToken, getDetails } from '../../service'

import { Button, message } from 'antd'

import {
    Container,
    ArticleBox,
} from './style'

import { editUpdateAction } from '../../store/action'
import { connect } from 'react-redux'



function Home(props) {
    const { id } = useParams()
    const { upLoadData, renderContent } = props
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [share, setShare] = useState(false)

    const history = useHistory()

    useEffect(() => {
        const fetchData = async (id) => {
            console.log(id)
            const { code, msg, data } = await getDetails(id)
            if (code === 0) {
                setContent((content) => content = data.content)
                setTitle((title) => title = data.title)
                setShare(data.share)
                upLoadData(data.content)
            } else {
                message.warning(data.msg)
            }
        }

        fetchData(id)

        
    }, [])

    const handleBack = () => {
        history.replace("/")
    }

    const handleCooperation = async() => {
        const { code } = await checkToken()
        if (code === 1) {
            message.warning("尚未登录，不可编辑")
        }

        if (code === 0) {
            history.replace('/cooperation/' + id)
        }
    }

    return (
        <Container>
            <Button className="back" type="primary" onClick={handleBack}>返回主页</Button>
            <ArticleBox>
                <div className="title">{title}</div>
                {
                    share ? <div className="share"><Button type="primary" onClick={handleCooperation}>协作编辑</Button></div> : ""
                }
                <div className="content" dangerouslySetInnerHTML={{__html:renderContent}}></div>
            </ArticleBox>
        </Container>
    )
}


const stateToProps = state => {
    return {
        renderContent: state.editContent
    }
}

const stateToDispatch = dispatch => {
    return {
        upLoadData(text) {
            const action = editUpdateAction(text)
            dispatch(action)
        }
    }
}

export default connect(stateToProps, stateToDispatch)(Home)