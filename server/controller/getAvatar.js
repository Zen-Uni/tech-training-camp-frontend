const { ErrorModel, SuccessModel } = require('../config/resultModel')
const { User } = require('../db')



const getAvatar = async (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            email
        }, (err, data) => {
            if (err) {
                reject(new ErrorModel('头像更新失败'))
            }
            resolve(new SuccessModel({
                url: data.avatar
            }), '头像更新成功')
        })
    })
}

module.exports = getAvatar