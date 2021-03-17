const {
    SuccessModel,
    ErrorModel
} = require('../config/resultModel')

const {
    Article,
} = require('../db')


const getArticleConfig = async () => {
    return new Promise((resolve, reject) => {
        const list = Article.find()
        list.exec((err, data) => {
            if (err) {
                reject(err)
            } 
            resolve(data)
        })
    })
}

const getArticle = async () => {
    try {
        const res = await getArticleConfig()
        // console.log(res)
        return new SuccessModel(res, "获取文章成功")
    } catch (err) {
        console.log(err)
        return new ErrorModel("文章获取失败")
    }
}

module.exports = getArticle