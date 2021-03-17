const { get } = require('../config/emailConfig')
const {
    SuccessModel,
    ErrorModel
} = require('../config/resultModel')

const {
    Article,
} = require('../db')

const getArticle = async (id) => {
    return new Promise((resolve, reject) => {
        const details = Article.find({
            _id: id
        })

        details.exec((err, data) => {
            if (err) {
                reject(err)
            } 
            resolve(data)
        })
    })
}

const getArticleDetail = async (id) => {
    console.log(id)
    try {
        const res = await getArticle(id)
        const { content, title, share } = res[0]
        return new SuccessModel({ content, title, share }, "文章读取成功")
    } catch (err) {
        console.log(err)
        return new ErrorModel("文章读取失败")
    }
}

module.exports = getArticleDetail