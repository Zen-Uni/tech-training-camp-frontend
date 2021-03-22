import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { getArticle } from '../../service'

import {
    RightWrapper,
    RightContainer,
    RightAvatar,
    RightContent,
    RightItem,
} from './style'


// import image handle function
import { handlePostImg } from '../../util/postImg'

function Right() {

    const [list, setList] = useState([])

    const history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            const { code, data } = await getArticle()
            if (code === 0) {
                setList(data)
            } 
            if (code === 1) {
                message.error(data.msg)
            }
        }

        fetchData()
    }, [])

    const handleArticleDetail = (id) => {
        history.replace('/article/'+ id)
    }

    return (
        <RightWrapper>
            <RightContainer>
                <RightAvatar id="avatar" >
                    <label htmlFor="file" className="avatar-shadow">
                        <div className="label-tip">更换头像</div>
                    </label>
                    <input type="file" id="file"  onChange={handlePostImg}>
                    </input>
                </RightAvatar>

                <RightContent>
                    {/* <RightItem>
                        <div className="title">前端工程化浅析</div>
                        <div className="article-config">刘辰浩&nbsp;&nbsp;<span>共享</span></div>
                    </RightItem> */}
                    
                    
                    {
                        list.map((item, index) => {
                            return (
                                <RightItem  key={index}>
                                    <div className="title" onClick={() => handleArticleDetail(item._id)} >{item.title}</div>
                                    <div className="article-config">{item.username}{item.share ? <span>共享</span>: ""}</div>
                                </RightItem>
                            )
                        })
                    }
                </RightContent>

            </RightContainer>
        </RightWrapper>
    )
}

export default Right