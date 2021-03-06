/**
 * @description 后端与用户数据有关的 API
 * @author Uni
 */

const router = require('koa-router')()


// import controller logic
const emailVerify = require('../controller/handleCaptcha')
const registerController = require('../controller/register')
const loginController = require('../controller/login')

const {
  User,
  Captcha,
  Article,
} = require('../db')

const checkLogin = require('../controller/checkLogin')
const { parseJWT } = require('../middleware/jwt')
const postArticle = require('../controller/postArticle')
const getArticle = require('../controller/getArticle')
const getArticleDetail = require('../controller/getArticleDetail')
const upDateArticle = require('../controller/updateArticle')
const getAvatar = require('../controller/getAvatar')

router.prefix('/api/user')


router.post('/captcha', async (ctx, next) => {
    const { email } = ctx.request.body
    ctx.body = await emailVerify(email)
})


router.post('/register', async (ctx, next) => {
    const { username, password, email, captcha } = ctx.request.body
    const payload = {
        username,
        password,
        captcha,
        email,
      }
    
    const res = await registerController(payload)

    ctx.body = res
})

router.post('/login', async (ctx, next) => {
    const { email, password } = ctx.request.body
    console.log(email, password)
    const payload = {
      email, 
      password
    }
    const res = await loginController(payload)
    console.log('ok')
    ctx.body = res
  })

router.get('/token', async (ctx, next) => {
  const token = ctx.headers.authorization
  ctx.body = await checkLogin(token)
})

router.post('/post-article', async (ctx, next) => {
  const token = ctx.headers.authorization
  const { username, title, content, share } = ctx.request.body
  const { data } = parseJWT(token)
  const email = data.username
  const payload = {
    username,
    title,
    content,
    share,
    email,
  }
  
  ctx.body = await postArticle(payload)
})

router.get('/article-list', async (ctx, next) => {
  const res = await getArticle()
  
  ctx.body = res
})

router.post('/article-detail', async (ctx, next) => {
  const {id} = ctx.request.body
  const res = await getArticleDetail(id)
  ctx.body = res
})

router.post('/article-update', async (ctx, next) => {
  const { id, content } = ctx.request.body
  const res = await upDateArticle({id, content})
  ctx.body = res
})

router.get('/avatar', async (ctx, next) => {
  const token = ctx.headers.authorization
  const { data } = parseJWT(token)
  const email = data.username
  const res = await getAvatar(email)
  console.log(res)
  ctx.body = res
})


// dev api
router.get('/empty', async (ctx, next) => {
  await User.remove(err => {
    if (err)  console.log('remove user error:', err)
    else  console.log('remove success')
  })
})

router.get('/captchanull', async (ctx, next) => {
  await Captcha.remove(err => {
    if (err)  console.log('remove captcha error:', err)
    else  console.log('remove success')
  })
})

router.get('/empty-article', async (ctx, next) => {
  await Article.remove(err => {
    if (err) console.log('remove article errror:', err)
    else console.log('remove success')
  })
})



module.exports = router