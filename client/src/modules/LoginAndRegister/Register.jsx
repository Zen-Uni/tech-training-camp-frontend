/**
 * @description 注册组件
 * @author Uni
 */

import React from 'react'

import { Form, Input, Button, Row, Col, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
// import style
import {
    loginLayout,
    loginButtonLayout
} from './style'


// import fetch
import {
    captcha,
    register
} from '../../service'
import { connect } from 'react-redux'
import { configReq, storeToken } from '../../util/token'

import {
    updateUserConfig
} from '../../store/action'

 
const Register = (props) => {

    const { handleChange, handleLogin } = props

    const history = useHistory()

    const [form] = Form.useForm()

    const onFinish = async(values) => {
        const  { code, data }= await register(values)
        if (code === 0) {
            storeToken(data.token)
            configReq()
            handleLogin(data.username)
            history.replace('/')
        } else {
            message.error(data.msg)
        }
    };


    const getCaptcha = async () => {
        const email = form.getFieldValue('email')
        const { code, msg, data } = await captcha({email})
        if (code === 0) {
            message.success(msg)
        } else {
            message.error(data.msg)
        }
    }

    return (
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        style={loginLayout}
        form={form}
        >
        <Form.Item
            name="username"
            rules={[
            {
                required: true,
                message: '请输入用户名',
            },
            ]}
        >
            <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            
            placeholder="Username"
            />
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
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email"  />
        </Form.Item>
        <Form.Item label="验证码" extra="We must make sure that your are a human.">
            <Row gutter={8}>
            <Col span={12}>
                <Form.Item
                name="captcha"
                noStyle
                rules={[
                    {
                    required: true,
                    message: 'Please input the captcha you got!',
                    },
                ]}
                >
                <Input/>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Button onClick={getCaptcha}>获取验证码</Button>
            </Col>
            </Row>
        </Form.Item>
        <Form.Item style={loginButtonLayout}>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{display: "inline-block", width: "160px"}}>
            注册
            </Button>
            <div style={{margin: "20px 0px"}} onClick={handleChange}>
                <Link>去登陆</Link>
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

export default connect(null, stateToDispatch)(Register)
