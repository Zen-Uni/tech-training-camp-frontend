const router = require('koa-router')()


// import controller logic
const emailVerify = require('../controller/handleCaptcha')
const registerController = require('../controller/register')
const loginController = require('../controller/login')

const {
  User,
  Captcha
} = require('../db')

const checkLogin = require('../controller/checkLogin')

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

router.get('/token', async (ctx, next) => {
  const token = ctx.headers.authorization
  ctx.body = await checkLogin(token)
})


module.exports = router