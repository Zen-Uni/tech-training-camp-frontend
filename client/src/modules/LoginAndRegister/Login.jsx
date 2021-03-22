/**
 * @description login page
 * @author Uni
 */

// TODO: 测试登录注册，优化逻辑

import React, {  } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'

// import action
import {
    updateUserConfig
} from '../../store/action'

// import style
import {
    loginLayout,
    loginButtonLayout
} from './style'


// import service interface
import { login } from '../../service'


// import util
import {
    configReq,
    storeToken,
} from '../../util/token'


const Login = (props) => {

    const { handleChange, handleLogin } = props

    const history = useHistory()

    const onFinish = async (values) => {
        const {
            code, 
            data,
        } = await login(values)
        
       if (code === 0) {
        //    message.success(msg, 1)
        //    .then(() => {
        //        history.replace('/article')
        //    })
           storeToken(data.token)
           configReq()
           handleLogin(data.username)
           history.replace('/')
       } else {
           message.error(data.msg)
       }
    };

    return (
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        style={loginLayout}
        >
        <Form.Item
            name="email"
            rules={[
                {
                    type: "email",
                    message: '请输入正确的邮箱格式',
                },

                {
                    required: true,
                    message: '请输入用户邮箱',
                },
            ]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
            {
                required: true,
                message: '请输入密码',
            },
            ]}
        >
            <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            />
        </Form.Item>
        <Form.Item style={loginButtonLayout}>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{display: "inline-block", width: "160px"}}>
                登录
            </Button>
            <div style={{margin: "20px 0px"}} onClick={handleChange}>
                <Link>去注册</Link>
            </div>
        </Form.Item>
        </Form>
    );
};

const stateToDispatch = dispatch => {
    return {
        handleLogin(username) {
            const action = updateUserConfig(username)
            dispatch(action)
        }
    }
}


export default connect(null, stateToDispatch)(Login)

