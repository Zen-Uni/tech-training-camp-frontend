const {
    SuccessModel,
    ErrorModel
} = require('../config/resultModel')

const { 
    User,
 } = require('../db/')

const {
    parseJWT
  }  = require('../middleware/jwt')


  const getUser = async ({email}) => {
    return new Promise((resolve, reject) => {
        const exist = User.find({
            email
        })

        exist.exec((err, data) => {
            console.log(data[0].username)
            resolve(data[0].username)
        })
    })
}

const checkLogin = async (token) => {
    const { code, data } = parseJWT(token)
    console.log(code)
    if (code === -1) return new ErrorModel("尚未登录")
    else if (code === 0) {
        const {
            username: email
        } = data
        console.log('email -----', email)
        const username = await getUser({email})
        return new SuccessModel({ username }, "已登录")
    }
}


module.exports = checkLogin