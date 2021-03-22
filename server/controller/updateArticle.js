/**
 * @description 协同编辑，文章更新
 * @author Uni
 */

// import ErrorInfo
const ErrorInfo = require('../config/errorInfo')

const {
    SuccessModel,
    ErrorModel
} = require('../config/resultModel')

const {
    Article,
} = require('../db')

const upDate = async (id, content) => {
    return new Promise((resolve, reject) => {
        Article.findByIdAndUpdate(id, {
            content,
        }, function(err, data) {
            if (err) {
                reject(err)
            }
            resolve(true)
        })
    })
}

const upDateArticle = async ({id, content}) => {
    try {
        const res = await upDate(id, content)
        console.log(res)
        return new SuccessModel("更新成功")
    } catch (err) {
        console.log(err)
        return new ErrorModel(ErrorInfo.upDateArticleErrorInfo)
    }
    
}

module.exports = upDateArticle