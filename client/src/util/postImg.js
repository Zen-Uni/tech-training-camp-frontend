/**
 * @description 封装头像上传方法
 * @author Uni
 */

import { message } from "antd"

import {  checkToken, upLoadImg } from "../service"

export const handlePostImg = async (e) => {
    const auth = await checkToken()
    console.log(auth)
    
    if (auth.code === 1) {
        return message.warning(auth.data.msg)
    }
    const files = e.target.files
    console.log(files)
    console.log(files[0])

    const formData = new FormData()
    formData.append('upImg', files[0])
    console.log(formData.get('upImg'))
    const res =  await upLoadImg(formData)
    if (res.code === 0) {
        message.success(res.msg, .5, () => {
            window.location.href = '/'
        })
    }
}


