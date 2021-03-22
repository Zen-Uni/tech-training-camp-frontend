/**
 * @description 上传头像
 * @author Uni
 */

// import ErrorInfo
const ErrorInfo = require('../config/errorInfo')


const { ErrorModel, SuccessModel } = require('../config/resultModel')
const { User } = require('../db')



const getAvatar = async (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            email
        }, (err, data) => {
            if (err) {
                reject(new ErrorModel(ErrorInfo.upLoadAvatarErrorInfo))
            }
            resolve(new SuccessModel({
                url: data.avatar
            }), '头像更新成功')
        })
    })
}

module.exports = getAvatar