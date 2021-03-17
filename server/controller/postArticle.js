const {
    SuccessModel,
    ErrorModel
} = require('../config/resultModel')

const {
    Article,
} = require('../db')

const storeArticle = async payload => {
    const article = new Article(payload)
    
    return new Promise((resolve, reject) => {
        article.save(err => {
            if (err) {
                console.log('save article error --- ', err)
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}

const postArticle = async payload => {
    try {
        const res = await storeArticle(payload)
        if (res) {
            return new SuccessModel("文章发布成功")
        }
    } catch (err) {
        console.log(err)
        return new ErrorModel("文章发布失败")
    }
}

module.exports = postArticle