const { ErrorModel, SuccessModel } = require('../config/resultModel')

const path = require('path')
const fse = require('fs-extra')
const { User } = require('../db')



// 图片最大体积 1M
const MAX_SIZE = 1024 * 1024 * 1024

// 设置目的目录
const DIR = path.join(__dirname, '..', 'uploadFiles/', 'avatar')


// console.log(DIR)


const storeAvatarUrl = async (url, email) => {

    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({email}, {
            avatar: url
        }, (err, data) => {
            if (err) {
                reject(err)
            }

            resolve(true)
        })
    })
}


const upLoadAvatar = async ({ name, type, size, filePath, email }) => {
    if (size > MAX_SIZE) {
        await fse.remove(filePath)
        return new ErrorModel("图片体积过大，超过 1M")
    }

    // 移动到服务器控制区域
    const fileName = Date.now() + '.' + name
    const distFilePath = path.join(DIR, fileName)
    await fse.move(filePath, distFilePath)

    // 返回路由
    const url = 'avatar/' + fileName

    try {
        const res = await storeAvatarUrl(url, email)
        if (res) {
            return new SuccessModel('头像更新成功')
        }
    } catch (err) {
        console.log('头像更新失败 --------', err)
        return new ErrorModel('头像更新失败')
    }

   
    // return new SuccessModel({
    //     url: 'avatar/' + fileName
    // })
}


module.exports = upLoadAvatar